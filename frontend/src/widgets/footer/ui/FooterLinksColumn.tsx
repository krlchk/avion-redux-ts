import Link from "next/link";
import { FooterLinksColumnProps } from "../model/types";

export const FooterLinksColumn = ({ title, links }: FooterLinksColumnProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
      <h2 className="mobile:text-lg mb-2 text-xl leading-6 font-bold text-black">
        {title}
      </h2>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} aria-label={label}>
          {label}
        </Link>
      ))}
    </div>
  );
};
