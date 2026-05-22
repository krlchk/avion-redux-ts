"use client";

import { useState } from "react";

import { FormSubmitHandler } from "@/shared/model/types";
import { Container } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useLoginMutation,
  useTwoFactorVerifyMutation,
} from "@/store/services/authApi";
import { setTempToken, setToken } from "@/store/slices/authSlice";
import { getLoginErrorMessage } from "../model/profile.utils";
import { LoginForm } from "./LoginForm";
import { OtpForm } from "./OtpForm";
import { LoginStep } from "../model/types";

export const ProfileLogin = () => {
  const dispatch = useAppDispatch();
  const { token, tempToken } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const [twoFactorVerify, { isLoading: isTwoFactorVerifyLoading }] =
    useTwoFactorVerifyMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<LoginStep>("login");

  const handleLoginSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
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
        setMessage("Enter the verification code sent to your email.");
        return;
      }

      dispatch(setToken(response.token));
      setPassword("");
      setMessage("You are signed in.");
    } catch (error) {
      setMessage(getLoginErrorMessage(error));
    }
  };

  const handleOtpSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!otp.trim()) {
      setMessage("Verification code is required.");
      return;
    }

    try {
      if (!tempToken) {
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
      setMessage("You are signed in.");
    } catch (error) {
      setMessage(getLoginErrorMessage(error));
    }
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
              token={token}
              step={step}
            />
          )}
          {step === "otp" && (
            <OtpForm
              handleOtpSubmit={handleOtpSubmit}
              otp={otp}
              setOtp={setOtp}
              isLoading={isTwoFactorVerifyLoading}
              message={message}
              token={token}
              step={step}
            />
          )}
        </Container>
      </div>
    </section>
  );
};
