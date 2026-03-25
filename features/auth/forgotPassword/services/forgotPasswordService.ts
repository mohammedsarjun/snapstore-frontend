
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const forgotPassword = async (data: { email: string }) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.FORGOT_PASSWORD, data);
  return res.data;
};
