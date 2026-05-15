export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterLinksColumnProps {
  title: string;
  links: FooterLink[];
}
