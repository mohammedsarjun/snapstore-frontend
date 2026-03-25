"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, ResetPasswordForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { resetPasswordSchema } from "../../schema";
import { resetPassword } from "../services/changePasswordService";
import { toast } from "react-toastify";

// ── Constants ─────────────────────────────────────────
const EMPTY_RESET: ResetPasswordForm = {
  password: "",
  confirmPassword: "",
};

// ── Hook ──────────────────────────────────────────────
export function useChangePassword(token: string) {
  const [form, setForm] = useState<ResetPasswordForm>(EMPTY_RESET);
  const [errors, setErrors] = useState<FormErrors<ResetPasswordForm>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    name: keyof ResetPasswordForm & string,
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
    const res: ObjResult<ResetPasswordForm> = resetPasswordSchema.parse(form);

    if (res.errors !== undefined) {
      setErrors(res.errors);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (!token) {
      setApiError("Invalid reset link");
      return;
    }

    try {
      setErrors({});
      setLoading(true);
      setApiError(null);
      await resetPassword({
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password reset successfully!");

      // Redirect to login page
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
