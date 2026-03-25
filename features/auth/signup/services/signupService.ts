
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import { SignUpForm } from "../../types";

export const signupUser = async (data:SignUpForm) => {
  const res = await axiosInstance.post(
    API_ROUTES.AUTH.SIGNUP,
    data
  );

  return res.data;
};