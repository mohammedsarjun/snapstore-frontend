"use client";

import React, { FC, ReactElement } from "react";
import styles from "./styles/topbar.module.css";
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface TopbarProps {
  user: string;
}

export const Topbar: FC<TopbarProps> = ({ user }): ReactElement => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
      localStorage.removeItem("token");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className={styles.tbShell}>
      <div className={styles.tbBrand}>Frame.</div>
      <div className={styles.tbRight}>
        <div className={styles.tbUser}>
          Hello, <strong>{user}</strong>
        </div>
        <button className={styles.tbOut} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
};
