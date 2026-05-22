import { FormSubmitHandler } from "@/shared/model/types";

export type LoginStep = "login" | "otp";

export interface LoginFormProps {
  handleSubmit: FormSubmitHandler;
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (e: string) => void;
  isLoading: boolean;
  message: string;
  token: string | null;
  step: LoginStep;
}
export interface OtpFormProps {
  handleOtpSubmit: FormSubmitHandler;
  otp: string;
  setOtp: (e: string) => void;
  isLoading: boolean;
  message: string;
  token: string | null;
  step: LoginStep;
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
