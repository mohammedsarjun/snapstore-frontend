// ════════════════════════════════════════════════════════════════════════════
// SIGNUP COMPONENT
// ════════════════════════════════════════════════════════════════════════════

import BrandPanel from "@/components/common/BrandPanel";
import Field from "@/components/common/Field";

 
// ── Styles ────────────────────────────────────────────────────────────────────
const SIGNUP_STYLES: string = `
  .su-bg { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:768px){ .su-bg { grid-template-columns:1fr; } }
  .su-panel { display:flex; flex-direction:column; justify-content:center; align-items:center; padding:3rem 2rem; overflow-y:auto; }
  .su-card { background:var(--card); border-radius:8px; padding:2.5rem 2.5rem 2rem; width:100%; max-width:440px; box-shadow:var(--shadow); border:1px solid var(--warm); }
  .su-title { font-family:var(--display); font-size:1.85rem; font-weight:700; margin-bottom:.3rem; letter-spacing:-.5px; }
  .su-sub { font-size:.9rem; color:var(--muted); margin-bottom:1.8rem; font-weight:300; }
  .su-ok { background:#edf7f1; border:1px solid #b6dfc7; border-radius:var(--radius); color:#2d7a4f; padding:.8rem 1rem; font-size:.88rem; margin-bottom:1rem; }
  .su-btn { width:100%; padding:.85rem; background:var(--ink); color:var(--cream); border:none; border-radius:var(--radius); font-family:var(--body); font-size:.95rem; font-weight:500; cursor:pointer; margin-top:.5rem; transition:background .2s; }
  .su-btn:hover { background:#2a2826; }
  .su-link { text-align:center; margin-top:1.2rem; font-size:.88rem; color:var(--muted); }
  .su-link button { background:none; border:none; cursor:pointer; color:var(--accent2); font-weight:500; font-size:.88rem; font-family:var(--body); text-decoration:underline; }
`;
 
// ── Types ─────────────────────────────────────────────────────────────────────
interface SignUpForm {
  userName:        string;
  email:           string;
  phoneNumber:     string;
  password:        string;
  confirmPassword: string;
}
 
interface SignUpProps {
  onNavigate: (page: Page) => void;
}
 
// ── Schema ────────────────────────────────────────────────────────────────────
const signUpSchema: ObjSchema<SignUpForm> = z.object<SignUpForm>({
  userName:        z.string().nonempty("Username is required").min(3, "Min 3 chars").max(20, "Max 20 chars"),
  email:           z.string().nonempty("Email is required").email("Enter a valid email"),
  phoneNumber:     z.string().nonempty("Phone is required").regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
  password:        z.string().nonempty("Password is required").min(8, "Min 8 chars").regex(/[A-Z]/, "Need one uppercase").regex(/[0-9]/, "Need one number"),
  confirmPassword: z.string().nonempty("Please confirm your password"),
});
 
// ── Constants ─────────────────────────────────────────────────────────────────
const EMPTY_SIGNUP: SignUpForm = {
  userName: "", email: "", phoneNumber: "", password: "", confirmPassword: "",
};
 
// ── Component ─────────────────────────────────────────────────────────────────
const SignUp: FC<SignUpProps> = ({ onNavigate }): ReactElement => {
  const [form,    setForm]    = useState<SignUpForm>(EMPTY_SIGNUP);
  const [errors,  setErrors]  = useState<FormErrors<SignUpForm>>({});
  const [success, setSuccess] = useState<boolean>(false);
 
  const handleChange = (name: keyof SignUpForm & string, value: string): void => {
    setForm((prev: SignUpForm): SignUpForm => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (): void => {
    const res: ObjResult<SignUpForm> = signUpSchema.parse(form);
    if (res.errors !== undefined) { setErrors(res.errors); return; }
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    setErrors({});
    setSuccess(true);
    setTimeout((): void => { onNavigate("login"); }, 1600);
  };
 
  return (
    <>
      <style>{SIGNUP_STYLES}</style>
      <div className="su-bg">
        <BrandPanel />
        <div className="su-panel">
          <div className="su-card">
            <div className="su-title">Create account</div>
            <div className="su-sub">Join Frame and start building your gallery</div>
            {success && <div className="su-ok">✓ Account created! Redirecting…</div>}
            <Field<SignUpForm> label="Username"         name="userName"        value={form.userName}        onChange={handleChange} errors={errors} placeholder="yourname" />
            <Field<SignUpForm> label="Email"            name="email"           type="email"    value={form.email}           onChange={handleChange} errors={errors} placeholder="you@example.com" />
            <Field<SignUpForm> label="Phone Number"     name="phoneNumber"     type="tel"      value={form.phoneNumber}     onChange={handleChange} errors={errors} placeholder="+91 9876543210" />
            <Field<SignUpForm> label="Password"         name="password"        type="password" value={form.password}        onChange={handleChange} errors={errors} placeholder="Min 8 chars, 1 uppercase, 1 number" />
            <Field<SignUpForm> label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} errors={errors} placeholder="Repeat password" />
            <button className="su-btn" onClick={handleSubmit}>Create Account</button>
            <div className="su-link">
              Already have an account?{" "}
              <button onClick={(): void => { onNavigate("login"); }}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};