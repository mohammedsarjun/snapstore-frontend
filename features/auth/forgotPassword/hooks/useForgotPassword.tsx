"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, ForgotForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { forgotSchema } from "../../schema";
import { forgotPassword } from "../services/forgotPasswordService";
import { toast } from "react-toastify";

// ── Constants ─────────────────────────────────────────
const EMPTY_FORGOT: ForgotForm = { email: "" };

// ── Hook ──────────────────────────────────────────────
export function useForgotPassword() {
  const [form, setForm] = useState<ForgotForm>(EMPTY_FORGOT);
  const [errors, setErrors] = useState<FormErrors<ForgotForm>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    name: keyof ForgotForm & string,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const res: ObjResult<ForgotForm> = forgotSchema.parse(form);

    if (res.errors !== undefined) {
      setErrors(res.errors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      setApiError(null);
      await forgotPassword({ email: form.email });

      toast.success("Reset link sent to your email!");

      // Redirect to login page after sending
      setTimeout(() => {
        router.push("/login");
      }, 2000);

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = typeof err === "string" ? err : "Something went wrong";
      setApiError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    apiError,
    handleChange,
    handleSubmit,
    router,
  };
}
