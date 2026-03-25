"use client";

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";

import { ReactElement } from "react";

import styles from "./styles/login.module.css";
import { LoginForm } from "@/features/auth/types";
import { useLogin } from "../hooks/useLogin";

export const Login = (): ReactElement => {
    const { form, errors, success, handleChange, handleSubmit, router, loading, apiError } = useLogin();

    return (
        <>
            <div className={styles["li-bg"]}>
                <BrandPanel />
                <div className={styles["li-panel"]}>
                    <div className={styles["li-card"]}>
                        <div className={styles["li-title"]}>Welcome back</div>
                        <div className={styles["li-sub"]}>Sign in to your SnapStore account</div>
                        {apiError && <div className={styles["li-error"]}>{apiError}</div>}
                        {success && <div className={styles["li-ok"]}>✓ Login successful! Redirecting…</div>}
                        <Field<LoginForm> label="Email" name="email" type="email" value={form.email} onChange={handleChange} errors={errors} placeholder="you@example.com" />
                        <Field<LoginForm> label="Password" name="password" type="password" value={form.password} onChange={handleChange} errors={errors} placeholder="Your password" />
                        <button className={styles["li-forgot"]} onClick={(): void => { router.push("/reset-password"); }}>
                            Forgot password?
                        </button>
                        <button className={styles["li-btn"]} onClick={handleSubmit} disabled={loading}>
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                        <div className={styles["li-link"]}>
                            No account?{" "}
                            <button onClick={(): void => { router.push("/signup"); }}>Create one</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
