import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../store/user/user-slice";

export function UserModal({ isUserModalOpen }: { isUserModalOpen: boolean }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.root.user.user);

  return (
    <div
      className={clsx(
        "absolute right-0 z-[2] mr-10 flex h-auto w-auto justify-center rounded-lg bg-slate-500/60 px-8 py-4 backdrop-blur-sm transition-transform duration-500 xs:w-2/3 xs:px-4 xs:py-2",

        isUserModalOpen ? "translate-y-10" : "-translate-y-96",
      )}
    >
      {user ? (
        <div>
          <h2 className="text-xl text-white xs:text-base">
            <span className="font-bold text-black">Name: </span>
            {user.name}
          </h2>
          <p className="text-xl text-white xs:text-base">
            <span className="font-bold text-black">Email:</span> {user.email}
          </p>
          <button
            onClick={() => dispatch(logout())}
            className="mt-3 w-full rounded-md bg-red-500 p-2 font-semibold text-white xs:p-1 xs:text-sm"
          >
            Log out
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xl text-white xs:text-center xs:text-base">
            You are <span className="font-bold text-red-500">not</span> logged
            in
          </p>
          <Link to="/login">
            <button className="mt-3 w-full rounded-md bg-blue-950 p-2 font-semibold text-white xs:p-1 xs:text-sm">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
