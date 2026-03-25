"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import { ReactElement } from "react";

import styles from "./styles/forgot.module.css";
import { ForgotForm } from "@/features/auth/types";
import { useForgotPassword } from "../hooks/useForgotPassword";

export const ForgotPassword = (): ReactElement => {
    const { form, errors, loading, apiError, handleChange, handleSubmit, router } = useForgotPassword();

    return (
        <div className={styles["fp-bg"]}>
            <BrandPanel />
            <div className={styles["fp-panel"]}>
                <div className={styles["fp-card"]}>
                    <div className={styles["fp-title"]}>Reset password</div>
                    <div className={styles["fp-sub"]}>Enter your email and we&apos;ll send a reset link</div>
                    {apiError && <div className={styles["fp-error"]}>{apiError}</div>}
                    <Field<ForgotForm>
                        label="Email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        errors={errors} placeholder="you@example.com"
                    />
                    <button
                        className={styles["fp-btn"]}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Sending…" : "Send Reset Link"}
                    </button>
                    <div className={styles["fp-link"]}>
                        <button onClick={(): void => { router.push("/login"); }}>← Back to login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
