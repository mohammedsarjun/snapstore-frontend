"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";

import styles from "./styles/forgot.module.css";
import { FormErrors } from "@/types/Fields";
import { ForgotForm, ForgotPasswordProps, ObjResult } from "@/features/auth/types";
import { forgotSchema } from "@/features/auth/schema";

const EMPTY_FORGOT: ForgotForm = { email: "" };

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onReset }): ReactElement => {
    const router = useRouter();
    const [form, setForm] = useState<ForgotForm>(EMPTY_FORGOT);
    const [errors, setErrors] = useState<FormErrors<ForgotForm>>({});
    const [sent, setSent] = useState<boolean>(false);

    const handleChange = (name: keyof ForgotForm & string, value: string): void => {
        setForm((prev: ForgotForm): ForgotForm => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (): void => {
        const res: ObjResult<ForgotForm> = forgotSchema.parse(form);
        if (res.errors !== undefined) {
            setErrors(res.errors);
            return;
        }
        setErrors({});
        setSent(true);
        if (onReset) onReset(form.email);
    };

    const handleNavigate = (page: string): void => {
        router.push(`/${page}`);
    };

    return (
        <div className={styles["fp-bg"]}>
            <BrandPanel />
            <div className={styles["fp-panel"]}>
                <div className={styles["fp-card"]}>
                    <div className={styles["fp-title"]}>Reset password</div>
                    <div className={styles["fp-sub"]}>Enter your email and we'll send a reset link</div>
                    {sent && <div className={styles["fp-ok"]}>✓ Reset link sent! Check your inbox.</div>}
                    <Field<ForgotForm>
                        label="Email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        errors={errors} placeholder="you@example.com"
                    />
                    {!sent && <button className={styles["fp-btn"]} onClick={handleSubmit}>Send Reset Link</button>}
                    <div className={styles["fp-link"]}>
                        <button onClick={(): void => { handleNavigate("login"); }}>← Back to login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
