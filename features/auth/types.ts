import { FormErrors } from "@/types/Fields";

export interface LoginForm {
    email: string;
    password: string;
    [key: string]: string;
}

export interface SignUpForm {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    [key: string]: string;
}

export interface ForgotForm {
    email: string;
    [key: string]: string;
}

export interface OtpForm {
    otp: string;
    [key: string]: string;
}

export interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
    [key: string]: string;
}

export type ObjOk<T extends Record<string, string>> = { readonly values: T; readonly errors?: never };
export type ObjFail<T extends Record<string, string>> = { readonly errors: FormErrors<T>; readonly values?: never };
export type ObjResult<T extends Record<string, string>> = ObjOk<T> | ObjFail<T>;
export interface ObjSchema<T extends Record<string, string>> {
    parse(data: { readonly [K in keyof T]?: unknown }): ObjResult<T>;
}


type Page = "login" | "signup" | "forgot" | "gallery" | "verify-otp" | "change-password";
export interface LoginProps {
    onLogin?: (email: string) => void;
}

export interface SignUpProps {
    onSignUp?: (data: SignUpForm) => void;
}

export interface ForgotPasswordProps {
    onReset?: (email: string) => void;
}

export interface OtpProps {
    onVerify?: (otp: string) => void;
}

export interface ResetPasswordProps {
    token: string;
}
