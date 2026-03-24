import { ReactElement } from "react";
import ForgotPassword from "@/features/auth/forgotPassword/components/ForgotPassword";

// ── Component ─────────────────────────────────────────────────────────────────
export const ResetPasswordPage = (): ReactElement => {
    return (
        <>
            <ForgotPassword />
        </>
    );
};

export default ResetPasswordPage;
