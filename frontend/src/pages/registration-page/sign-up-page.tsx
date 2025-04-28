import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import SignupValidation from "../../hooks/sign-up-validation";
import {
  logout,
  registerUser,
  resetStatus,
} from "../../components/store/user/user-slice";

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error,user } = useAppSelector((state) => state.root.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    nameMessage: "",
    emailMessage: "",
    passwordMessage: "",
  });

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, navigate, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = SignupValidation(name, email, password);
    setErrors(validationErrors);

    if (
      !validationErrors.nameMessage &&
      !validationErrors.emailMessage &&
      !validationErrors.passwordMessage
    ) {
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
      } catch (err) {
        console.error("Registration failed", err);
      }
    }
  };

  const renderError = (message: string) =>
    message ? <span className="text-red-700">{message}</span> : null;

  return (
    <div className="mx-auto flex h-[100vh] items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-600">
      <div className="flex h-[70vh] w-full max-w-[1700px] items-center justify-center bg-[url(/sign-in.png)] bg-cover bg-center p-3">
        {user ? (
          <div className="flex flex-col gap-5 rounded-xl bg-orange-200 p-10 font-DMSans text-2xl font-semibold text-white mobile:p-5 mobile:text-lg xs:p-3">
            <p className="text-center">You are already registered</p>
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
            <h2 className="text-center text-2xl">Sign-Up</h2>
            {error && (
              <span className="text-center text-red-700">
                Incorret email or password <br />
                or user with this email already registered
              </span>
            )}
            <div className="flex w-full flex-col">
              <label htmlFor="name">Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="rounded-md bg-orange-300 p-2 outline-none placeholder:font-light placeholder:text-orange-500 mobile:ml-0"
                type="text"
                name="name"
                placeholder="Enter Name"
              />
              {renderError(errors.nameMessage)}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="email">Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md bg-orange-300 p-2 outline-none placeholder:font-light placeholder:text-orange-500 mobile:ml-0"
                type="email"
                name="email"
                placeholder="Enter Email"
              />
              {renderError(errors.emailMessage)}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
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
              {status === "loading" ? "Signing up..." : "Sign up"}
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
              to="/login"
              className="w-full rounded-md bg-orange-500 p-2 text-center transition-colors hover:bg-orange-700"
            >
              or Login
            </Link>
            {status === "succeeded" && (
              <p className="mt-4 text-green-500">✅ Sign up successfull!</p>
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
