"use client";

import { useState } from "react";

import { FormSubmitHandler } from "@/shared/model/types";
import { Container } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useTwoFactorVerifyMutation,
  useVerifyPasswordOtpMutation,
} from "@/store/services/authApi";
import { setTempToken, setToken } from "@/store/slices/authSlice";
import {
  getLoginErrorMessage,
  getPasswordResetErrorMessage,
} from "../../model/profile.utils";
import { ForgotPasswordForm } from "../passwordReset";
import { LoginForm } from "./LoginForm";
import { OtpForm } from "./OtpForm";
import { LoginStep, ProfileMessageType } from "../../model/types";
import { ResetOtpForm, ResetPasswordForm } from "../passwordReset";

export const ProfileLogin = () => {
  const dispatch = useAppDispatch();
  const { tempToken } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const [twoFactorVerify, { isLoading: isTwoFactorVerifyLoading }] =
    useTwoFactorVerifyMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [verifyPasswordOtp, { isLoading: isVerifyPasswordOtpLoading }] =
    useVerifyPasswordOtpMutation();
  const [resetPassword, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<ProfileMessageType>("error");
  const [otp, setOtp] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<LoginStep>("login");

  const handleLoginSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Email and password are required.");
      return;
    }

    try {
      const response = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (response.requiresTwoFactor) {
        setStep("otp");
        dispatch(setTempToken(response.tempToken));
        setMessageType("success");
        setMessage("Enter the verification code sent to your email.");
        return;
      }

      dispatch(setToken(response.token));
      setPassword("");
      setMessageType("success");
      setMessage("You are signed in.");
    } catch (error) {
      setMessageType("error");
      setMessage(getLoginErrorMessage(error));
    }
  };

  const handleOtpSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!otp.trim()) {
      setMessageType("error");
      setMessage("Verification code is required.");
      return;
    }

    try {
      if (!tempToken) {
        setMessageType("error");
        setMessage("Verification session expired. Please login again.");
        setStep("login");
        return;
      }

      const response = await twoFactorVerify({
        otp: otp.trim(),
        tempToken: tempToken,
      }).unwrap();

      dispatch(setToken(response.token));
      setPassword("");
      setOtp("");
      setStep("login");
      setMessageType("success");
      setMessage("You are signed in.");
    } catch (error) {
      setMessageType("error");
      setMessage(getLoginErrorMessage(error));
    }
  };

  const handleForgotPasswordSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!resetEmail.trim()) {
      setMessageType("error");
      setMessage("Email is required.");
      return;
    }

    try {
      await forgotPassword({ email: resetEmail.trim() }).unwrap();
      setStep("resetOtp");
      setMessageType("success");
      setMessage("We sent a reset code to your email.");
    } catch (error) {
      setMessageType("error");
      setMessage(getPasswordResetErrorMessage(error));
    }
  };

  const handleResetOtpSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (resetOtp.trim().length !== 6) {
      setMessageType("error");
      setMessage("Enter the 6-digit code from your email.");
      return;
    }

    try {
      const response = await verifyPasswordOtp({
        email: resetEmail.trim(),
        otp: resetOtp.trim(),
      }).unwrap();

      setResetToken(response.resetToken);
      setStep("reset");
      setMessageType("success");
      setMessage("Code verified. Create your new password.");
    } catch (error) {
      setMessageType("error");
      setMessage(getPasswordResetErrorMessage(error));
    }
  };

  const handleResetPasswordSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.trim().length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!resetToken) {
      setMessageType("error");
      setMessage("Reset session expired. Please request a new code.");
      setStep("forgot");
      return;
    }

    try {
      await resetPassword({
        resetToken,
        newPassword,
      }).unwrap();

      setStep("login");
      setPassword("");
      setResetEmail("");
      setResetOtp("");
      setResetToken("");
      setNewPassword("");
      setMessageType("success");
      setMessage("Password changed. You can sign in now.");
    } catch (error) {
      setMessageType("error");
      setMessage(getPasswordResetErrorMessage(error));
    }
  };

  const handleOpenForgotPassword = () => {
    setMessage("");
    setMessageType("error");
    setResetEmail(email);
    setStep("forgot");
  };

  const handleBackToLogin = () => {
    setMessage("");
    setMessageType("error");
    setResetOtp("");
    setResetToken("");
    setNewPassword("");
    setStep("login");
  };

  return (
    <section className="bg-[#f5f5f5]">
      <div className="w-full bg-[url('/images/auth/login.jpg')] bg-cover bg-center py-44">
        <Container className="tablet:grid-cols-1 tablet:gap-12 tablet:px-10 mobile:grid-cols-1 mobile:gap-10 mobile:px-5 mobile:py-10 grid grid-cols-2 gap-12 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <section className="mobile:py-0 flex flex-col justify-between py-10">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-[#f5f5f5]/75 uppercase">
                Avion account
              </p>
              <h1 className="mobile:text-4xl mobile:leading-12 mt-8 text-5xl leading-16.25 font-bold">
                Welcome back
              </h1>
              <p className="mt-7 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/82">
                Sign in to manage your orders, checkout faster, and leave
                reviews for pieces you have purchased.
              </p>
            </div>
            <div className="mt-20 border-t border-[#f5f5f5]/20 pt-8">
              <p className="text-2xl leading-8 font-bold text-[#f5f5f5]/75">
                Secure access
              </p>
              <p className="mt-3 max-w-110 text-base leading-7 text-[#f5f5f5]/65">
                Your account keeps orders, checkout details and review access in
                one calm place.
              </p>
            </div>
          </section>

          {step === "login" && (
            <LoginForm
              handleSubmit={handleLoginSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              message={message}
              messageType={messageType}
              onForgotPassword={handleOpenForgotPassword}
            />
          )}
          {step === "otp" && (
            <OtpForm
              handleOtpSubmit={handleOtpSubmit}
              otp={otp}
              setOtp={setOtp}
              isLoading={isTwoFactorVerifyLoading}
              message={message}
              messageType={messageType}
            />
          )}
          {step === "forgot" && (
            <ForgotPasswordForm
              handleSubmit={handleForgotPasswordSubmit}
              email={resetEmail}
              setEmail={setResetEmail}
              isLoading={isForgotPasswordLoading}
              message={message}
              messageType={messageType}
              onBackToLogin={handleBackToLogin}
            />
          )}
          {step === "resetOtp" && (
            <ResetOtpForm
              handleSubmit={handleResetOtpSubmit}
              otp={resetOtp}
              setOtp={setResetOtp}
              isLoading={isVerifyPasswordOtpLoading}
              message={message}
              messageType={messageType}
              onBackToLogin={handleBackToLogin}
            />
          )}
          {step === "reset" && (
            <ResetPasswordForm
              handleSubmit={handleResetPasswordSubmit}
              password={newPassword}
              setPassword={setNewPassword}
              isLoading={isResetPasswordLoading}
              message={message}
              messageType={messageType}
              onBackToLogin={handleBackToLogin}
            />
          )}
        </Container>
      </div>
    </section>
  );
};
