import Link from "next/link";
import { navLinks, navIconLinks } from "../model/constants";
import { Logo } from "@/shared/icons/Logo";

export const MainHeader = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-10">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <p className="text-xl leading-6 font-bold text-black uppercase">
            Avion
          </p>
        </div>

        <div className="flex gap-8 text-lg leading-6 font-normal text-black">
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
        <div className="flex gap-5">
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
