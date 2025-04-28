import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loginUser,
  logout,
  resetStatus,
} from "../../components/store/user/user-slice";
import { useState } from "react";
import LoginValidation from "../../hooks/login-validation";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useAppSelector((state) => state.root.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailMessage: "",
    passwordMessage: "",
  });

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     const timer = setTimeout(() => {
  //       dispatch(resetStatus());
  //       navigate("/");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [dispatch, navigate, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = LoginValidation(email, password);
    setErrors(validationErrors);

    if (!validationErrors.emailMessage && !validationErrors.passwordMessage) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        dispatch(resetStatus());
        navigate("/");
      } catch (err) {
        console.error("Login failed", err);
      }
    }
  };

  const renderError = (message: string) =>
    message ? <span className="text-red-700">{message}</span> : null;

  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-600">
      <div className="flex h-[70vh] w-full max-w-[1700px] items-center justify-center bg-[url(/login-hero.jpg)] bg-cover bg-center p-3">
        {user ? (
          <div className="flex flex-col gap-5 rounded-xl bg-orange-200 p-10 font-DMSans text-2xl font-semibold text-white mobile:p-5 mobile:text-lg xs:p-3">
            <p className="text-center">You are already logged in</p>
            <Link
              to="/"
              className="w-full rounded-md bg-orange-300 p-2 text-center text-xl transition-colors hover:bg-orange-400"
            >
              To store!
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="w-full rounded-md bg-orange-700 p-2 text-center text-xl transition-colors hover:bg-orange-900"
            >
              Log out
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 rounded-xl bg-orange-200 p-10 font-DMSans text-lg font-semibold text-white mobile:p-5 mobile:text-base xs:p-3"
            action=""
          >
            <h2 className="text-center text-2xl">Login</h2>
            {renderError(errors.emailMessage)}
            <div className="flex w-full flex-col">
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-md bg-orange-300 p-2 outline-none placeholder:font-light placeholder:text-orange-500 mobile:ml-0"
                type="email"
                name="email"
                placeholder="Enter Email"
              />
              {errors.emailMessage && (
                <span className="text-red-700">{errors.emailMessage}</span>
              )}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="rounded-md bg-orange-300 p-2 outline-none placeholder:font-light placeholder:text-orange-500 mobile:ml-0 mobile:mt-2"
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {renderError(errors.passwordMessage)}
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-orange-300 p-2 transition-colors hover:bg-orange-400"
            >
              {status === "loading" ? "Logging in..." : "Log in"}
            </button>
            <p className="mt-2">
              You are agree to our{" "}
              <Link
                to="https://react.dev/"
                className="cursor-pointer underline transition-colors hover:text-orange-500"
              >
                terms
              </Link>{" "}
              and{" "}
              <Link
                to="https://react.dev/"
                className="cursor-pointer underline transition-colors hover:text-orange-500"
              >
                policies
              </Link>{" "}
            </p>
            <Link
              to="/signup"
              className="w-full rounded-md bg-orange-500 p-2 text-center transition-colors hover:bg-orange-700"
            >
              or Create Account
            </Link>
            {status === "succeeded" && (
              <p className="mt-4 text-green-500">✅ Login successfull!</p>
            )}
            {status === "failed" && (
              <p className="mt-4 text-red-500">❌ {error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
