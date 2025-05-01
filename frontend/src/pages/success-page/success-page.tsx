import { Link } from "react-router-dom";

export const SuccessPage = () => (
  <div className="flex flex-col p-10 text-center items-center">
    <h1 className="text-4xl font-bold text-[#2A254B]">Payment Successful!</h1>
    <p className="mt-4">Check your email for order confirmation.</p>
    <Link
      to="/"
      className="mt-4 w-1/2 rounded-md mobile:text-base bg-[#2A254B] p-2 text-center text-xl text-white transition-colors hover:bg-[#2A254B]/80"
    >
      Back to store
    </Link>
  </div>
);
