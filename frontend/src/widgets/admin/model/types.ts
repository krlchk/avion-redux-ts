import type { ReactNode } from "react";
import type { Role } from "@/features/user/model/types";

export interface AdminShellProps {
  children: ReactNode;
  activeSection: AdminSection;
}

export interface AdminPageProps {
  activeSection: AdminSection;
  children: ReactNode;
}

export type AdminSection =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "promocodes"
  | "reviews"
  | "users";

export interface AdminNavigationItem {
  href: string;
  label: string;
  section: AdminSection;
  roles: Role[];
}
