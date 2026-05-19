import { Category } from "@/features/category/model/types";
import { type ComponentProps } from "react";

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

export type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
