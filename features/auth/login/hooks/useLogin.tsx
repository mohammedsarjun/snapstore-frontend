"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, LoginForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { loginSchema } from "../../schema";
import { loginUser } from "../services/loginService";

// ── Constants ─────────────────────────────────────────
const EMPTY_LOGIN: LoginForm = {
  email: "",
  password: "",
};

// ── Hook ──────────────────────────────────────────────
export function useLogin() {
  const [form, setForm] = useState<LoginForm>(EMPTY_LOGIN);
  const [errors, setErrors] = useState<FormErrors<LoginForm>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
    name: keyof LoginForm & string,
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
    const res: ObjResult<LoginForm> = loginSchema.parse(form);

    if (res.errors !== undefined) {
      setErrors(res.errors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      setApiError(null);
      const response = await loginUser(form);

      // Store token in localStorage
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      setSuccess(true);

      // Redirect to home page after successful login
      setTimeout(() => {
        router.push("/home");
      }, 1000);

      return {
        success: true,
        data: response,
      };
    } catch (err: unknown) {
      const errorMsg = typeof err === "string" ? err : "Something went wrong";

      // If user is not verified, redirect to OTP page
      if (errorMsg === "Please verify your email before logging in") {
        sessionStorage.setItem("verifyEmail", form.email);
        router.push("/verify-otp");
        return;
      }

      setApiError(errorMsg);

      return {
        success: false,
        error: errorMsg,
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
