"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import { ReactElement } from "react";
import styles from "./styles/changePassword.module.css";
import { ResetPasswordForm, ResetPasswordProps } from "../../types";
import { useChangePassword } from "../hooks/useChangePassword";

export const ChangePassword = ({ token }: ResetPasswordProps): ReactElement => {
    const { form, errors, loading, apiError, handleChange, handleSubmit, router } = useChangePassword(token);

    return (
        <div className={styles["cp-bg"]}>
            <BrandPanel />
            <div className={styles["cp-panel"]}>
                <div className={styles["cp-card"]}>
                    <div className={styles["cp-title"]}>Set new password</div>
                    <div className={styles["cp-sub"]}>Enter your new password below</div>
                    {apiError && <div className={styles["cp-error"]}>{apiError}</div>}

                    <Field<ResetPasswordForm>
                        label="New Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        errors={errors}
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                    />

                    <Field<ResetPasswordForm>
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        errors={errors}
                        placeholder="Repeat password"
                    />

                    <button
                        className={styles["cp-btn"]}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Resetting…" : "Reset Password"}
                    </button>

                    <div className={styles["cp-link"]}>
                        <button onClick={(): void => { router.push("/login"); }}>← Back to login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
