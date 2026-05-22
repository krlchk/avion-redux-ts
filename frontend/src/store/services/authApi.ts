import { ProfileResponse } from "@/features/user/model/types";
import { baseApi } from "./baseApi";

export type LoginResponse =
  | {
      token: string;
      requiresTwoFactor?: false;
      tempToken?: never;
    }
  | {
      requiresTwoFactor: true;
      tempToken: string;
      token?: never;
    };

export interface LoginRequest {
  email: string;
  password: string;
}

interface TwoFactorVerifyResponse {
  token: string;
}
interface TwoFactorVerifyRequest {
  tempToken: string;
  otp: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface PasswordMessageResponse {
  message: string;
}

interface VerifyPasswordOtpRequest {
  email: string;
  otp: string;
}

interface VerifyPasswordOtpResponse {
  resetToken: string;
}

interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

interface ToggleTwoFactorRequest {
  enabled: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    twoFactorVerify: build.mutation<
      TwoFactorVerifyResponse,
      TwoFactorVerifyRequest
    >({
      query: (body) => ({
        url: "/auth/2fa/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: build.mutation<
      PasswordMessageResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body,
      }),
    }),
    verifyPasswordOtp: build.mutation<
      VerifyPasswordOtpResponse,
      VerifyPasswordOtpRequest
    >({
      query: (body) => ({
        url: "/auth/password/verify",
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation<PasswordMessageResponse, ResetPasswordRequest>(
      {
        query: (body) => ({
          url: "/auth/password/reset",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      },
    ),
    toggleTwoFactor: build.mutation<ProfileResponse, ToggleTwoFactorRequest>({
      query: (body) => ({
        url: "/auth/me/2fa",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useToggleTwoFactorMutation,
  useTwoFactorVerifyMutation,
  useVerifyPasswordOtpMutation,
} = authApi;
