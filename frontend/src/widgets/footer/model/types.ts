import { Category } from "@/features/category/model/types";

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterLinksColumnProps {
  title: string;
  links: FooterLink[];
}

export interface FooterCategoryLinkColumnProps {
  title: string;
  categories: Category[];
}
