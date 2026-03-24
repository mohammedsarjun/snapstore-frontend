"use client"
import { SignUpForm } from "../../types";
import { ReactElement} from "react";
import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";
import styles from "./styles/signup.module.css"
import { useSignup } from "../hooks/useSignUp";

 
// ── Component ─────────────────────────────────────────────────────────────────
export default  (): ReactElement => {
  const { form, errors, success, handleChange, handleSubmit,router,loading,apiError } = useSignup();
 
  return (
    <>
      <div className={styles["su-bg"]}>
        <BrandPanel />
        <div className={styles["su-panel"]}>
          <div className={styles["su-card"]}>
            <div className={styles["su-title"]}>Create account</div>
            <div className={styles["su-sub"]}>Join Frame and start building your gallery</div>
            {apiError && <div className={styles["su-error"]}>{apiError}</div>}
            {success && <div className={styles["su-ok"]}>✓ Account created! Redirecting…</div>}
            <Field<SignUpForm> label="Username"         name="userName"        value={form.userName}        onChange={handleChange} errors={errors} placeholder="yourname" />
            <Field<SignUpForm> label="Email"            name="email"           type="email"    value={form.email}           onChange={handleChange} errors={errors} placeholder="you@example.com" />
            <Field<SignUpForm> label="Phone Number"     name="phoneNumber"     type="tel"      value={form.phoneNumber}     onChange={handleChange} errors={errors} placeholder="+91 9876543210" />
            <Field<SignUpForm> label="Password"         name="password"        type="password" value={form.password}        onChange={handleChange} errors={errors} placeholder="Min 8 chars, 1 uppercase, 1 number" />
            <Field<SignUpForm> label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} errors={errors} placeholder="Repeat password" />
            <button className={styles["su-btn"]} onClick={handleSubmit} disabled={loading}>Create Account</button>
            <div className={styles["su-link"]}>
              Already have an account?{" "}
              <button onClick={(): void => { router.push("login"); }}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 