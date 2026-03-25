
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const resetPassword = async (data: { token: string; password: string; confirmPassword: string }) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.RESET_PASSWORD, data);
  return res.data;
};
