import clsx from "clsx";
import { FormEvent, useEffect } from "react";
import { UiButtons } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { enterEmail, resetStatus, sendEmail } from "../store/user/user-slice";

export function EmailComponent({
  className,
  color,
  inputClassName,
}: {
  className: string;
  color: string;
  inputClassName: string;
}) {
  const dispatch = useAppDispatch();
  const { email, status, error } = useAppSelector((state) => state.root.user);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    dispatch(sendEmail({ email: email }));
    dispatch(enterEmail(""));
  };

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
        return () => clearTimeout(timer);
      }, 3000);
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className={clsx(className, "flex mobile:mt-10")}
      >
        <input
          required
          placeholder="your@email.com"
          className={clsx(
            inputClassName,
            "w-96 px-6 outline-none placeholder:font-medium tablet:w-52 xs:w-44",
          )}
          value={email}
          onChange={(e) => dispatch(enterEmail(e.target.value))}
          type="email"
        />
        <UiButtons type="submit" className="mobile:px-4" color={color}>
          {status === "loading" ? "Sending..." : "Sign up"}
        </UiButtons>
      </form>
      {status === "succeeded" && (
        <p className="mt-4 text-green-500">✅ Email sent!</p>
      )}
      {status === "failed" && <p className="mt-4 text-red-500">❌ {error}</p>}
    </div>
  );
}
