"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ObjResult, SignUpForm } from "../../types";
import { FormErrors } from "@/types/Fields";
import { signUpSchema } from "../../schema";
import { signupUser } from "../services/signupService";
import axios from "axios";

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
  const router = useRouter();

  const handleChange = (
    name: keyof SignUpForm & string,
    value: string
  ): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      return {
        success: true,
        data: res,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || err.message)
        return {
          success: false,
          error: err.response?.data?.message || err.message,
        };
      }
      setApiError("Something Went Wrong")

      return {
        success: false,
        error: "Something went wrong",
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
    apiError
  };
}