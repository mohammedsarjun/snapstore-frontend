
import { FormErrors } from "@/types/Fields";
import z from "zod";
import { LoginForm, ObjResult, ObjSchema } from "./types";
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
