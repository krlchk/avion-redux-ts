import { FormSubmitHandler } from "@/shared/model/types";
import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/features/order/model/types";

export type LoginStep = "login" | "otp" | "forgot" | "resetOtp" | "reset";
export type ProfileMessageType = "success" | "error";
export type ProfileConfirmAction = "twoFactor" | "logout";

export interface LoginFormProps {
  handleSubmit: FormSubmitHandler;
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (e: string) => void;
  isLoading: boolean;
  message: string;
  messageType: ProfileMessageType;
  onForgotPassword: () => void;
}
export interface OtpFormProps {
  handleOtpSubmit: FormSubmitHandler;
  otp: string;
  setOtp: (e: string) => void;
  isLoading: boolean;
  message: string;
  messageType: ProfileMessageType;
}

export interface ForgotPasswordFormProps {
  handleSubmit: FormSubmitHandler;
  email: string;
  setEmail: (e: string) => void;
  isLoading: boolean;
  message: string;
  messageType: ProfileMessageType;
  onBackToLogin: () => void;
}

export interface ResetOtpFormProps {
  handleSubmit: FormSubmitHandler;
  otp: string;
  setOtp: (e: string) => void;
  isLoading: boolean;
  message: string;
  messageType: ProfileMessageType;
  onBackToLogin: () => void;
}

export interface ResetPasswordFormProps {
  handleSubmit: FormSubmitHandler;
  password: string;
  setPassword: (e: string) => void;
  isLoading: boolean;
  message: string;
  messageType: ProfileMessageType;
  onBackToLogin: () => void;
}

export interface RegisterFormProps {
  handleSubmit: FormSubmitHandler;
  name: string;
  setName: (e: string) => void;
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (e: string) => void;
  isLoading: boolean;
  message: string;
  isRegistered: boolean;
}

export interface ProfileFieldProps {
  label: string;
  value: string;
}

export interface ProfileConfirmModalProps {
  title: string;
  description: string;
  confirmText: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ProfileOrderRowProps {
  order: Order;
}

export interface ProfileOrderItemRowProps {
  item: OrderItem;
}

export interface ProfileOrderMetaProps {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}

export interface ProfileOrderPriceRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

export type ProfileOrderStatusFilter = OrderStatus | "ALL";

export interface ProfileOrdersFilterProps {
  selectedStatus: ProfileOrderStatusFilter;
  setSelectedStatus: (value: ProfileOrderStatusFilter) => void;
}
