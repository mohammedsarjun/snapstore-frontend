"use client";


import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";


import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";


import styles from "./styles/login.module.css";
import { FormErrors } from "@/types/Fields";
import { LoginForm, LoginProps, ObjResult } from "@/features/auth/types";
import { loginSchema } from "@/features/auth/schema";

const EMPTY_LOGIN: LoginForm = { email: "", password: "" };

export const Login: FC<LoginProps> = ({ onLogin }): ReactElement => {
    const router = useRouter();
    const [form, setForm] = useState<LoginForm>(EMPTY_LOGIN);
    const [errors, setErrors] = useState<FormErrors<LoginForm>>({});

    const handleChange = (name: keyof LoginForm & string, value: string): void => {
        setForm((prev: LoginForm): LoginForm => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (): void => {
        const res: ObjResult<LoginForm> = loginSchema.parse(form);
        if (res.errors !== undefined) {
            setErrors(res.errors);
            return;
        }
        setErrors({});
        if (onLogin) onLogin(form.email);
        else console.log("Logging in with", form.email);
    };

    const handleNavigate = (page: "login" | "signup" | "forgot" | "gallery"): void => {
        router.push(`/${page}`);
    };

    return (
        <>
            <div className={styles["li-bg"]}>
                <BrandPanel />
                <div className={styles["li-panel"]}>
                    <div className={styles["li-card"]}>
                        <div className={styles["li-title"]}>Welcome back</div>
                        <div className={styles["li-sub"]}>Sign in to your Frame account</div>
                        <Field<LoginForm> label="Email" name="email" type="email" value={form.email} onChange={handleChange} errors={errors} placeholder="you@example.com" />
                        <Field<LoginForm> label="Password" name="password" type="password" value={form.password} onChange={handleChange} errors={errors} placeholder="Your password" />
                        <button className={styles["li-forgot"]} onClick={(): void => { handleNavigate("forgot"); }}>
                            Forgot password?
                        </button>
                        <button className={styles["li-btn"]} onClick={handleSubmit}>Sign In</button>
                        <div className={styles["li-link"]}>
                            No account?{" "}
                            <button onClick={(): void => { handleNavigate("signup"); }}>Create one</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
