import { FormErrors } from "@/types/Fields";

export interface LoginForm {
    email: string;
    password: string;
    [key: string]: string;
}

export type ObjOk<T extends Record<string, string>> = { readonly values: T; readonly errors?: never };
export type ObjFail<T extends Record<string, string>> = { readonly errors: FormErrors<T>; readonly values?: never };
export type ObjResult<T extends Record<string, string>> = ObjOk<T> | ObjFail<T>;
export interface ObjSchema<T extends Record<string, string>> {
    parse(data: { readonly [K in keyof T]?: unknown }): ObjResult<T>;
}


type Page = "login" | "signup" | "forgot" | "gallery";
export interface LoginProps {
    onLogin?: (email: string) => void;
}

