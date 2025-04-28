import clsx from "clsx";
import { FormEvent, useEffect, useState } from "react";
import { UiButtons } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetStatus, sendEmail } from "../store/user/user-slice";

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
  const { status, error } = useAppSelector((state) => state.root.user);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    dispatch(sendEmail({ email: email }));
  };

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
      return () => clearTimeout(timer);
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
          onChange={(e) => setEmail(e.target.value)}
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
