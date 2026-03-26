"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, SignUpForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { signUpSchema } from "../../schema";
import { signupUser } from "../services/signupService";

// ── Constants ─────────────────────────────────────────
const EMPTY_SIGNUP: SignUpForm = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

// ── Hook ──────────────────────────────────────────────
export function useSignup() {
  const [form, setForm] = useState<SignUpForm>(EMPTY_SIGNUP);
  const [errors, setErrors] = useState<FormErrors<SignUpForm>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsRedirecting(true);
        router.replace("/home");
      }
    }
  });

  const handleChange = (
    name: keyof SignUpForm & string,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user types a new value
    setErrors((prev) => {
      if (prev[name]) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return prev;
    });
    // Clear API error when user types
    if (apiError) setApiError(null);
  };

  const handleSubmit = async () => {
    const res: ObjResult<SignUpForm> = signUpSchema.parse(form);

    if (res.errors !== undefined) {
      setErrors(res.errors);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      setErrors({});
      setLoading(true)
      const res = await signupUser(form);
      setSuccess(true);
      setApiError(null)

      // Store email in sessionStorage for OTP verification
      sessionStorage.setItem("verifyEmail", form.email);

      // Redirect to OTP verification page
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1000);

      return {
        success: true,
        data: res,
      };
    } catch (err: unknown) {
      if (typeof err === "string") {
        setApiError(err);
      } else {
        setApiError("Something went wrong");
      }
      return {
        success: false,
        error: typeof err === "string" ? err : "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    success,
    handleChange,
    handleSubmit,
    router,
    loading,
    apiError,
    isRedirecting,
  };
}