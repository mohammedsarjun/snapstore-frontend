"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, OtpForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { otpSchema } from "../../schema";
import { verifyOtp, resendOtp } from "../services/otpService";
import { toast } from "react-toastify";

// ── Constants ─────────────────────────────────────────
const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const EMPTY_OTP: OtpForm = { otp: "" };

// ── Hook ──────────────────────────────────────────────
export function useVerifyOtp() {
  const [form, setForm] = useState<OtpForm>(EMPTY_OTP);
  const [errors, setErrors] = useState<FormErrors<OtpForm>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [timer, setTimer] = useState(OTP_EXPIRY_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // Get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verifyEmail");
    if (!storedEmail) {
      router.push("/signup");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleChange = (
    name: keyof OtpForm & string,
    value: string
  ): void => {
    // Only allow digits, max 6 characters
    const sanitized = value.replace(/\D/g, "").slice(0, 6);
    setForm((prev) => ({ ...prev, [name]: sanitized }));
    // Clear field error when user types
    setErrors((prev) => {
      if (prev[name]) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return prev;
    });
    if (apiError) setApiError(null);
  };

  const handleSubmit = async () => {
    const res: ObjResult<OtpForm> = otpSchema.parse(form);

    if (res.errors !== undefined) {
      setErrors(res.errors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      setApiError(null);
      const response = await verifyOtp({ email, otp: form.otp });

      // Clean up sessionStorage
      sessionStorage.removeItem("verifyEmail");

      toast.success("Email verified successfully!");

      // Redirect to home
      setTimeout(() => {
        router.push("/home");
      }, 1000);

      return { success: true, data: response };
    } catch (err: unknown) {
      const errorMsg = typeof err === "string" ? err : "Something went wrong";
      setApiError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      setLoading(true);
      setApiError(null);
      await resendOtp({ email });
      toast.success("OTP resent to your email!");
      setTimer(OTP_EXPIRY_SECONDS);
      setCanResend(false);
      setForm(EMPTY_OTP);
    } catch (err: unknown) {
      const errorMsg = typeof err === "string" ? err : "Failed to resend OTP";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    apiError,
    timer,
    canResend,
    email,
    formatTime,
    handleChange,
    handleSubmit,
    handleResend,
    router,
  };
}
