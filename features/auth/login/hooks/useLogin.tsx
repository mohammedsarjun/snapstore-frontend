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
  const router = useRouter();

  const handleChange = (
    name: keyof LoginForm & string,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      if (response?.data?.token) {
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
  };
}
