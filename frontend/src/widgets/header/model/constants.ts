import { Cart, Like, Profile } from "@/shared/icons";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about_us", label: "About Us" },
  { href: "/contact_us", label: "Contact Us" },
];

export const navIconLinks = [
  { href: "/profile", label: "Profile", Icon: Profile },
  { href: "/liked", label: "Liked products", Icon: Like },
  { href: "/cart", label: "Cart", Icon: Cart },
];
