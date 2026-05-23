import type { ReactNode } from "react";
import type { Role } from "@/features/user/model/types";

export interface AdminShellProps {
  children: ReactNode;
  activeSection: AdminSection;
  panel?: AdminPanelType;
}

export interface AdminPageProps {
  activeSection: AdminSection;
  children: ReactNode;
}

export interface AdminDashboardProps {
  panel?: AdminPanelType;
}

export type AdminPanelType = "admin" | "designer";

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
