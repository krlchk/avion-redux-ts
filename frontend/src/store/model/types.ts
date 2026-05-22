import { ProfileResponse } from "@/features/user/model/types";
import type { OrderStatus } from "@/features/order/model/types";

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

export interface TwoFactorVerifyResponse {
  token: string;
}

export interface TwoFactorVerifyRequest {
  tempToken: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface PasswordMessageResponse {
  message: string;
}

export interface VerifyPasswordOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyPasswordOtpResponse {
  resetToken: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ToggleTwoFactorRequest {
  enabled: boolean;
}

export type ToggleTwoFactorResponse = ProfileResponse;

export interface NewsletterSubscriptionRequest {
  email: string;
}

export interface NewsletterSubscriptionResponse {
  message: string;
}

export interface ContactMessageRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactMessageResponse {
  message: string;
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  promoCode?: string;
}

export interface MyOrdersRequest {
  status?: OrderStatus;
}

export interface AuthState {
  token: string | null;
  tempToken: string | null;
}

export interface CartItem {
  count: number;
  id: string;
}

export interface CartState {
  cartProducts: CartItem[];
}

export interface WishlistState {
  likedProductIds: string[];
}
