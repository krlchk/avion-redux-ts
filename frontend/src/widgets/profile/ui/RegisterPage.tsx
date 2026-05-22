"use client";

import { useEffect, useState } from "react";

import { FormSubmitHandler } from "@/shared/model/types";
import { Container } from "@/shared/ui";
import { useCreateUserMutation } from "@/store/services/usersApi";
import { getRegisterErrorMessage } from "../model/profile.utils";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isRegistered) return;
    const timeoutId = window.setTimeout(() => router.push("/profile"), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [router, isRegistered]);

  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsRegistered(false);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Name, email and password are required.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      await createUser({
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      setName("");
      setEmail("");
      setPassword("");
      setMessage("Account created. Redirecting to login...");
      setIsRegistered(true);
    } catch (error) {
      setMessage(getRegisterErrorMessage(error));
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
                Create account
              </h1>
              <p className="mt-7 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/82">
                Join Avion to save your checkout session, manage future orders
                and keep your furniture experience personal.
              </p>
            </div>
            <div className="mt-20 border-t border-[#f5f5f5]/20 pt-8">
              <p className="text-2xl leading-8 font-bold text-[#f5f5f5]/75">
                Thoughtful access
              </p>
              <p className="mt-3 max-w-110 text-base leading-7 text-[#f5f5f5]/65">
                Registration takes a moment and keeps your account ready for
                orders, reviews and saved preferences.
              </p>
            </div>
          </section>

          <RegisterForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            message={message}
            isRegistered={isRegistered}
          />
        </Container>
      </div>
    </section>
  );
};
