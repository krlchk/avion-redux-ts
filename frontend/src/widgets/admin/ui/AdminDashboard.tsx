import Link from "next/link";
import { adminNavigationItems } from "../model/constants";
import type { AdminDashboardProps } from "../model/types";

const getPanelHref = (href: string, panel: AdminDashboardProps["panel"]) => {
  if (panel !== "designer") return href;

  return href === "/admin" ? "/designer" : href.replace("/admin", "/designer");
};

export const AdminDashboard = ({ panel = "admin" }: AdminDashboardProps) => {
  const isDesignerPanel = panel === "designer";
  const navigationItems = adminNavigationItems.filter((item) =>
    item.roles.includes(isDesignerPanel ? "DESIGNER" : "ADMIN"),
  );

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
        Workspace
      </p>
      <h1 className="mt-4 text-4xl font-bold">
        {isDesignerPanel ? "Designer panel" : "Management panel"}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 font-medium text-black/50">
        {isDesignerPanel
          ? "Manage your catalog products and storefront content from one place."
          : "Manage catalog content, orders and storefront operations from one place."}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 tablet:grid-cols-2 mobile:grid-cols-1">
        {navigationItems.slice(1).map((item) => (
          <Link
            key={item.href}
            href={getPanelHref(item.href, panel)}
            className="border border-black/10 p-5 transition-colors hover:border-[#947458] hover:text-[#947458]"
          >
            <p className="text-lg font-bold">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
