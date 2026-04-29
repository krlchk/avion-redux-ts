import { Link } from "react-router-dom";

export const CancelPage = () => (
  <div className="flex flex-col items-center p-10 text-center">
    <h1 className="text-4xl font-bold text-red-600">Payment Cancelled</h1>
    <p className="mt-4">You can try again later.</p>
    <Link
      to="/"
      className="mt-4 w-1/2 rounded-md bg-[#2A254B] p-2 text-center text-xl text-white transition-colors hover:bg-[#2A254B]/80 mobile:text-base"
    >
      Back to store
    </Link>
  </div>
);
