"use client";

import Link from "next/link";
import { Container, Loader } from "@/shared/ui";
import { useAppSelector } from "@/store/hooks";
import { useProfileQuery } from "@/store/services/usersApi";
import { adminNavigationItems } from "../model/constants";
import type { AdminShellProps } from "../model/types";
import { ProfileLogin } from "@/widgets/profile";

const getPanelHref = (href: string, isDesignerPanel: boolean) => {
  if (!isDesignerPanel) return href;

  return href === "/admin" ? "/designer" : href.replace("/admin", "/designer");
};

export const AdminShell = ({
  children,
  activeSection,
  panel,
}: AdminShellProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const {
    data: profile,
    isError,
    isLoading,
  } = useProfileQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <ProfileLogin />;
  }

  if (isLoading) {
    return (
      <section className="bg-[#f5f5f5] py-20">
        <Container className="flex min-h-120 items-center justify-center">
          <Loader />
        </Container>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="bg-[#f5f5f5] py-20">
        <Container className="text-center text-base font-medium text-[#FB5454]">
          Unable to load admin access.
        </Container>
      </section>
    );
  }

  const isDesignerPanel =
    panel === "designer" || (!panel && profile.role === "DESIGNER");
  const canAccessPanel = isDesignerPanel
    ? profile.role === "DESIGNER"
    : profile.role === "ADMIN";

  if (!canAccessPanel) {
    return (
      <section className="bg-[#f5f5f5] py-20">
        <Container className="text-center">
          <p className="text-2xl font-bold text-black">Access denied</p>
          <p className="mt-3 text-base font-medium text-black/50">
            This area is available only for authorized team members.
          </p>
        </Container>
      </section>
    );
  }

  const navigationItems = adminNavigationItems.filter((item) =>
    item.roles.includes(profile.role),
  );

  return (
    <section className="bg-[#f5f5f5] py-12">
      <Container className="grid grid-cols-[260px_1fr] gap-8 tablet:grid-cols-1 mobile:grid-cols-1">
        <aside className="border max-h-145 border-black/10 bg-white p-6 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <Link
            href={isDesignerPanel ? "/designer" : "/admin"}
            className="text-2xl font-bold uppercase"
          >
            {isDesignerPanel ? "Designer" : "Admin"}
          </Link>
          <p className="mt-2 text-sm font-medium text-black/45">
            {profile.name}
          </p>

          <nav className="mt-8 grid gap-2">
            {navigationItems.map((item) => {
              const isActive = item.section === activeSection;

              return (
                <Link
                  key={item.href}
                  href={getPanelHref(item.href, isDesignerPanel)}
                  className={`border px-4 py-3 text-sm font-bold tracking-[0.12em] uppercase transition-colors ${
                    isActive
                      ? "border-[#947458] bg-[#947458] text-[#f5f5f5]"
                      : "border-transparent text-black/55 hover:border-[#947458] hover:text-[#947458]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/profile"
            className="mt-8 block border-t border-black/10 pt-6 text-sm font-bold tracking-[0.12em] text-black/45 uppercase transition-colors hover:text-[#947458]"
          >
            Back to profile
          </Link>
        </aside>

        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
};
