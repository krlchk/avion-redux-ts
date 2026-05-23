import type { AdminNavigationItem } from "./types";

export const adminNavigationItems: AdminNavigationItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    section: "dashboard",
    roles: ["ADMIN", "DESIGNER"],
  },
  {
    href: "/admin/products",
    label: "Products",
    section: "products",
    roles: ["ADMIN", "DESIGNER"],
  },
  {
    href: "/admin/categories",
    label: "Categories",
    section: "categories",
    roles: ["ADMIN"],
  },
  {
    href: "/admin/orders",
    label: "Orders",
    section: "orders",
    roles: ["ADMIN"],
  },
  {
    href: "/admin/promocodes",
    label: "Promocodes",
    section: "promocodes",
    roles: ["ADMIN"],
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    section: "reviews",
    roles: ["ADMIN"],
  },
  {
    href: "/admin/users",
    label: "Users",
    section: "users",
    roles: ["ADMIN"],
  },
];

export const ADMIN_PRODUCTS_PER_PAGE = 9;
export const ADMIN_CATEGORIES_PER_PAGE = 9;
export const ADMIN_PROMOCODES_PER_PAGE = 9;
