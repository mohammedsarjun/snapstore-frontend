
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.VERIFY_OTP, data);
  return res.data;
};

export const resendOtp = async (data: { email: string }) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.RESEND_OTP, data);
  return res.data;
};
