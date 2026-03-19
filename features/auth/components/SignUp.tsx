"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";

import styles from "./styles/signup.module.css";
import { FormErrors } from "@/types/Fields";
import { SignUpForm, SignUpProps, ObjResult } from "@/features/auth/types";
import { signUpSchema } from "@/features/auth/schema";

const EMPTY_SIGNUP: SignUpForm = {
    userName: "", email: "", phoneNumber: "", password: "", confirmPassword: "",
};

export const SignUp: FC<SignUpProps> = ({ onSignUp }): ReactElement => {
    const router = useRouter();
    const [form, setForm] = useState<SignUpForm>(EMPTY_SIGNUP);
    const [errors, setErrors] = useState<FormErrors<SignUpForm>>({});
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (name: keyof SignUpForm & string, value: string): void => {
        setForm((prev: SignUpForm): SignUpForm => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (): void => {
        const res: ObjResult<SignUpForm> = signUpSchema.parse(form);
        if (res.errors !== undefined) {
            setErrors(res.errors);
            return;
        }
        if (form.password !== form.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }
        setErrors({});
        setSuccess(true);
        if (onSignUp) onSignUp(form);

        setTimeout((): void => { router.push("/login"); }, 1600);
    };

    const handleNavigate = (page: string): void => {
        router.push(`/${page}`);
    };

    return (
        <div className={styles["su-bg"]}>
            <BrandPanel />
            <div className={styles["su-panel"]}>
                <div className={styles["su-card"]}>
                    <div className={styles["su-title"]}>Create account</div>
                    <div className={styles["su-sub"]}>Join Frame and start building your gallery</div>
                    {success && <div className={styles["su-ok"]}>✓ Account created! Redirecting…</div>}
                    <Field<SignUpForm> label="Username" name="userName" value={form.userName} onChange={handleChange} errors={errors} placeholder="yourname" />
                    <Field<SignUpForm> label="Email" name="email" type="email" value={form.email} onChange={handleChange} errors={errors} placeholder="you@example.com" />
                    <Field<SignUpForm> label="Phone Number" name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} errors={errors} placeholder="+91 9876543210" />
                    <Field<SignUpForm> label="Password" name="password" type="password" value={form.password} onChange={handleChange} errors={errors} placeholder="Min 8 chars, 1 uppercase, 1 number" />
                    <Field<SignUpForm> label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} errors={errors} placeholder="Repeat password" />
                    <button className={styles["su-btn"]} onClick={handleSubmit}>Create Account</button>
                    <div className={styles["su-link"]}>
                        Already have an account?{" "}
                        <button onClick={(): void => { handleNavigate("login"); }}>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
