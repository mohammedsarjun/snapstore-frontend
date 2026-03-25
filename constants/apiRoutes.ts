// constants/apiRoutes.js

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  IMAGES: {
    BASE: '/images',
    UPLOAD: '/images/upload',
    REORDER: '/images/reorder',
  }
};