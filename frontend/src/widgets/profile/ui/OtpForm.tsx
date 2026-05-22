import { Loader } from "@/shared/ui";
import { OtpFormProps } from "../model/types";

export const OtpForm = ({
  handleOtpSubmit,
  otp,
  setOtp,
  isLoading,
  message,
  token,
  step,
}: OtpFormProps) => {
  return (
    <form
      onSubmit={handleOtpSubmit}
      className="mobile:p-6 border border-[#f5f5f5]/25 bg-[#f5f5f5]/95 p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      <div>
        <h2 className="text-3xl font-bold">Verification code</h2>
        <p className="mt-8 text-base leading-7 font-medium text-black/50">
          Enter the 6-digit code we sent to your email.
        </p>
      </div>

      <label className="mt-8 flex flex-col gap-2 text-base font-medium">
        Code
        <input
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          type="text"
          inputMode="numeric"
          placeholder="000000"
          className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="mobile:w-full mt-9 flex cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
      >
        {isLoading ? (
          <Loader styles="h-6 w-6 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
        ) : (
          "Verify code"
        )}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            token && step === "otp" ? "text-[#947458]" : "text-[#FB5454]"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};
