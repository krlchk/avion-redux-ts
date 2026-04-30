import Link from "next/link";
import { navLinks, navIconLinks } from "../model/constants";
import { Logo } from "@/shared/icons/Logo";

export const MainHeader = () => {
  return (
    <div className="bg-white">
      <div className="mobile:flex-wrap mobile:py-7 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-10">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <p className="text-xl leading-6 font-bold text-black uppercase xs:text-lg">
            Avion
          </p>
        </div>

        <div className="mobile:order-3 mobile:w-full mobile:justify-center mobile:text-base xs:gap-4 xs:text-sm flex gap-8 text-lg leading-6 font-normal text-black">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-all hover:underline hover:text-shadow-[0_0_0_#000]"
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
              className="transition-all hover:underline hover:text-shadow-[0_0_0_#000]"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
