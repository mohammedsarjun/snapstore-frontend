import { FieldProps } from "@/types/Fields";
import { ChangeEvent, ReactElement } from "react";
import styles from "./styles/field.module.css";
export default function Field<T extends Record<string, string>>({
    label, name, type = "text", value, onChange, errors, placeholder,
}: FieldProps<T>): ReactElement {
    const err: string | undefined = errors[name];
    return (
        <>
            <div className={styles["f-wrap"]}>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    type={type}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(name, e.target.value)}
                    className={err !== undefined ? styles["f-err"] : ""}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                {err !== undefined && <div className={styles["f-err-msg"]}>⚠ {err}</div>}
            </div>
        </>
    );
}