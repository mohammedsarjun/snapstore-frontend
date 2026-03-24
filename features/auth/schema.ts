
import { FormErrors } from "@/types/Fields";
import z from "zod";
import { ForgotForm, LoginForm, ObjResult, ObjSchema, SignUpForm } from "./types";

export const loginSchema: ObjSchema<LoginForm> = {
    parse(data: { readonly [K in keyof LoginForm]?: unknown }): ObjResult<LoginForm> {
        const result = z.object({
            email: z.string().min(1, "Email is required").email("Enter a valid email"),
            password: z.string().min(1, "Password is required"),
        }).safeParse(data);

        if (result.success) {
            return { values: result.data as LoginForm };
        } else {
            const errors: FormErrors<LoginForm> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof LoginForm;
                if (path) {
                    errors[path] = issue.message;
                }
            });
            return { errors };
        }
    },
};

export const signUpSchema: ObjSchema<SignUpForm> = {
    parse(data: { readonly [K in keyof SignUpForm]?: unknown }): ObjResult<SignUpForm> {
        const result = z.object({
            userName: z.string().min(1, "Username is required").min(3, "Min 3 chars").max(20, "Max 20 chars"),
            email: z.string().min(1, "Email is required").email("Enter a valid email"),
            phoneNumber: z.string().min(1, "Phone is required").regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
            password: z.string().min(1, "Password is required").min(8, "Min 8 chars").regex(/[A-Z]/, "Need one uppercase").regex(/[0-9]/, "Need one number"),
            confirmPassword: z.string().min(1, "Please confirm your password"),
        }).safeParse(data);

        if (result.success) {
            return { values: result.data as SignUpForm };
        } else {
            const errors: FormErrors<SignUpForm> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof SignUpForm;
                if (path) {
                    errors[path] = issue.message;
                }
            });
            return { errors };
        }
    },
};

export const forgotSchema: ObjSchema<ForgotForm> = {
    parse(data: { readonly [K in keyof ForgotForm]?: unknown }): ObjResult<ForgotForm> {
        const result = z.object({
            email: z.string().min(1, "Email is required").email("Enter a valid email"),
        }).safeParse(data);

        if (result.success) {
            return { values: result.data as ForgotForm };
        } else {
            const errors: FormErrors<ForgotForm> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof ForgotForm;
                if (path) {
                    errors[path] = issue.message;
                }
            });
            return { errors };
        }
    },
};
