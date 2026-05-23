import { Loader } from "@/shared/ui";
import { ResetPasswordFormProps } from "../../model/types";

export const ResetPasswordForm = ({
  handleSubmit,
  password,
  setPassword,
  isLoading,
  message,
  messageType,
  onBackToLogin,
}: ResetPasswordFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mobile:p-6 border border-[#f5f5f5]/25 bg-[#f5f5f5] p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      <div>
        <h2 className="text-3xl font-bold">Create new password</h2>
        <p className="mt-8 text-base leading-7 font-medium text-black/50">
          Choose a new password with at least 6 characters.
        </p>
      </div>

      <label className="mt-8 flex flex-col gap-2 text-base font-medium">
        New password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="New password..."
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
          "Update password"
        )}
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="mt-5 cursor-pointer text-sm font-bold text-black/45 transition-colors hover:text-[#947458]"
      >
        Back to login
      </button>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            messageType === "success" ? "text-[#947458]" : "text-[#FB5454]"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};
