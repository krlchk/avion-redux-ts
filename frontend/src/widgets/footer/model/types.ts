import { type ComponentProps } from "react";

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterLinksColumnProps {
  title: string;
  links: FooterLink[];
}

export type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
