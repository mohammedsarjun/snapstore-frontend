import { ReactElement } from "react";
import Login from "@/features/auth/components/Login";

import "./style.css";

export const LoginPage = (): ReactElement => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
