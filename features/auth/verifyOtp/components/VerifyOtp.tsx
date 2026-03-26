"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import { ReactElement } from "react";
import styles from "./styles/verifyOtp.module.css";
import { OtpForm } from "../../types";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

export const VerifyOtp = (): ReactElement => {
    const {
        form, errors, loading, apiError,
        timer, canResend, email, formatTime,
        handleChange, handleSubmit, handleResend, router, isRedirecting
    } = useVerifyOtp();

    if (isRedirecting) return <></>;

    return (
        <>
            <div className={styles["otp-bg"]}>
                <BrandPanel />
                <div className={styles["otp-panel"]}>
                    <div className={styles["otp-card"]}>
                        <div className={styles["otp-title"]}>Verify your email</div>
                        <div className={styles["otp-sub"]}>
                            We&apos;ve sent a 6-digit code to <strong>{email}</strong>
                        </div>
                        {apiError && <div className={styles["otp-error"]}>{apiError}</div>}

                        <Field<OtpForm>
                            label="Enter OTP"
                            name="otp"
                            value={form.otp}
                            onChange={handleChange}
                            errors={errors}
                            placeholder="000000"
                        />

                        <div className={styles["otp-timer"]}>
                            {!canResend ? (
                                <span>Code expires in <strong>{formatTime(timer)}</strong></span>
                            ) : (
                                <span className={styles["otp-expired"]}>Code expired</span>
                            )}
                        </div>

                        <button
                            className={styles["otp-btn"]}
                            onClick={handleSubmit}
                            disabled={loading || canResend}
                        >
                            {loading ? "Verifying…" : "Verify OTP"}
                        </button>

                        <button
                            className={`${styles["otp-resend"]} ${!canResend ? styles["otp-resend-disabled"] : ""}`}
                            onClick={handleResend}
                            disabled={!canResend || loading}
                        >
                            Resend OTP
                        </button>

                        <div className={styles["otp-link"]}>
                            <button onClick={(): void => { router.push("/login"); }}>← Back to login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyOtp;
