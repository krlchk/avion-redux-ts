import Link from "next/link";
import { navLinks, navIconLinks } from "../model/constants";
import { Container } from "@/shared/ui";

export const MainHeader = () => {
  return (
    <div className="bg-[#f5f5f5]">
      <Container className="mobile:flex-wrap mobile:py-7 flex items-center justify-between gap-6 py-10">
        <div className="flex items-center justify-center gap-2">
          <p className="xs:text-lg text-xl leading-6 font-bold text-black uppercase">
            Avion
          </p>
        </div>

        <div className="mobile:order-3 mobile:w-full mobile:justify-center mobile:text-base xs:gap-4 xs:text-sm flex gap-8 text-lg leading-6 font-normal text-black">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="xs:gap-4 flex gap-5">
          {navIconLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};
