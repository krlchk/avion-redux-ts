import Link from "next/link";
import { adminNavigationItems } from "../model/constants";

export const AdminDashboard = () => {
  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
        Workspace
      </p>
      <h1 className="mt-4 text-4xl font-bold">Management panel</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 font-medium text-black/50">
        Manage catalog content, orders and storefront operations from one place.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 tablet:grid-cols-2 mobile:grid-cols-1">
        {adminNavigationItems.slice(1).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-black/10 p-5 transition-colors hover:border-[#947458] hover:text-[#947458]"
          >
            <p className="text-lg font-bold">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
