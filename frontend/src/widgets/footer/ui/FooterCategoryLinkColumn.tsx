import Link from "next/link";
import { FooterCategoryLinkColumnProps } from "../model/types";

export const FooterCategoryLinkColumn = ({
  title,
  categories,
}: FooterCategoryLinkColumnProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
      <h2 className="mobile:text-lg mb-2 text-xl leading-6 font-bold text-black">
        {title}
      </h2>
      {categories.map(({ id, name }) => (
        <Link
          className="transition-colors duration-300 hover:text-[#947458]"
          href={`/products?categoryId=${encodeURIComponent(id)}`}
          key={id}
          aria-label={name}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
