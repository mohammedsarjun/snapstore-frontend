
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { LoginForm } from "../../types";

export const loginUser = async (data: LoginForm) => {
  const res = await axiosInstance.post(
    API_ROUTES.AUTH.LOGIN,
    data
  );

  return res.data;
};
