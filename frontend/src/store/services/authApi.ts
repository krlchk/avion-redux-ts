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
  }),
});

export const { useLoginMutation, useTwoFactorVerifyMutation } = authApi;
