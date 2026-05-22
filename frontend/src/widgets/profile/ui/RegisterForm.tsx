import { Loader } from "@/shared/ui";
import Link from "next/link";
import { RegisterFormProps } from "../model/types";

export const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  message,
  isRegistered,
}:RegisterFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mobile:p-6 border border-[#f5f5f5]/25 bg-[#f5f5f5]/95 p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      <div>
        <h2 className="text-3xl font-bold">Register</h2>
        <p className="mt-8 text-base leading-7 font-medium text-black/50">
          Create your customer account.
        </p>
      </div>

      <label className="mt-8 flex flex-col gap-2 text-base font-medium">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your name"
          className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
        />
      </label>

      <label className="mt-8 flex flex-col gap-2 text-base font-medium">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@email.com"
          className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
        />
      </label>

      <label className="mt-8 flex flex-col gap-2 text-base font-medium">
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="At least 6 characters"
          className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="mobile:w-full mt-9 flex cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {isLoading ? (
          <Loader styles="h-6 w-6 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
        ) : (
          "Create account"
        )}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            isRegistered ? "text-[#947458]" : "text-[#FB5454]"
          }`}
        >
          {message}
        </p>
      )}
      <p className="mt-8 text-base leading-7 font-medium text-black/50">
        Already have an account?{" "}
        <Link
          className="font-bold transition-all hover:underline"
          href={"/profile"}
        >
          Login
        </Link>
      </p>
    </form>
  );
};
