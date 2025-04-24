import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserModal({
  className,
  isUserModalOpen,
}: {
  className: string;
  isUserModalOpen: boolean;
}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div
      className={clsx(
        "xs:w-2/3 xs:px-4 xs:py-2 absolute right-0 z-[2] flex h-auto w-auto justify-center rounded-lg bg-slate-500/60 px-8 py-4 backdrop-blur-sm transition-transform duration-500",
        className,
        isUserModalOpen ? "translate-y-10" : "-translate-y-96",
      )}
    >
      {user ? (
        <div className="">
          <h2 className="xs:text-base text-xl text-white">
            <span className="font-bold text-black">Name: </span>
            {user.name}
          </h2>
          <p className="xs:text-base text-xl text-white">
            <span className="font-bold text-black">Email:</span> {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="xs:text-sm xs:p-1 mt-3 w-full rounded-md bg-red-500 p-2 font-semibold text-white"
          >
            Log out
          </button>
        </div>
      ) : (
        <div>
          <p className="xs:text-center xs:text-base text-xl text-white">
            You are <span className="font-bold text-red-500">not</span> logged
            in
          </p>
          <button
            className="xs:text-sm xs:p-1 mt-3 w-full rounded-md bg-blue-950 p-2 font-semibold text-white"
            onClick={loginNavigate}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
