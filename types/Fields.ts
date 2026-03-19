// ── Types ─────────────────────────────────────────────────────────────────────
export interface FieldProps<T extends Record<string, string>> {
  label:       string;
  name:        keyof T & string;
  type?:       "text" | "email" | "password" | "tel";
  value:       string;
  onChange:    (name: keyof T & string, value: string) => void;
  errors:      FormErrors<T>;
  placeholder?: string;
}
 
export type FormErrors<T extends Record<string, string>> = { [K in keyof T]?: string };
