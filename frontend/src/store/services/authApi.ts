import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  PasswordMessageResponse,
  ResetPasswordRequest,
  ToggleTwoFactorRequest,
  ToggleTwoFactorResponse,
  TwoFactorVerifyRequest,
  TwoFactorVerifyResponse,
  VerifyPasswordOtpRequest,
  VerifyPasswordOtpResponse,
} from "../model/types";
import { baseApi } from "./baseApi";

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
    toggleTwoFactor: build.mutation<
      ToggleTwoFactorResponse,
      ToggleTwoFactorRequest
    >({
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
