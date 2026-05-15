import { Facebook, Instagram, X, Youtube } from "@/shared/icons";
import { FooterLink } from "./types";

export const navIconLinks = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: Facebook },
  { href: "https://x.com/?lang=ru", label: "X", Icon: X },
  { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/", label: "Youtube", Icon: Youtube },
];

export const shopLinks: FooterLink[] = [
  { href: "/1", label: "Chairs" },
  { href: "/2", label: "Beds" },
  { href: "/3", label: "Sofas" },
  { href: "/4", label: "Cabinets" },
  { href: "/5", label: "Armchairs" },
  { href: "/6", label: "Sale" },
];
export const customerLinks: FooterLink[] = [
  { href: "/1", label: "Orders" },
  { href: "/2", label: "Addresses" },
  { href: "/3", label: "Account details" },
];
export const deliveryLinks: FooterLink[] = [
  { href: "/1", label: "Orders" },
  { href: "/3", label: "Account details" },
];
