import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavigateComponent } from "./header-components";
import { BurgerWindow } from "./header-components";
import { UserModal } from "./header-components";
import { BasketIcon, BurgerIcon, LogoIcon, ProfileIcon } from "./icons";

export function Header({ className }: { className: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleOpenForUserModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if ((window.innerWidth > 1279.99 && isOpen) || isUserModalOpen) {
        setIsOpen(false);
        setIsUserModalOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, isUserModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.scrollY > 1 && isOpen) || isUserModalOpen) {
        setIsOpen(false);
        setIsUserModalOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isUserModalOpen]);

  return (
    <section className={clsx(className, "")}>
      <div className="flex justify-between">
        <Link to="/" className="flex items-center">
          <LogoIcon className="text-[#22202E]" />
        </Link>
        <NavigateComponent className="font-Playfair mobile:hidden flex gap-11 text-lg font-normal leading-6 text-[#726E8D] [&>*:hover]:text-[#22202E] [&>*]:transition-colors" />
        <div className="flex gap-4">
          <Link to="/basket-page">
            <BasketIcon className="text-[#22202E] transition-colors hover:text-[#22202E]/80" />
          </Link>
          <button onClick={handleOpenForUserModal}>
            <ProfileIcon className="text-[#22202E] transition-colors hover:text-[#22202E]/80" />
          </button>
          <button onClick={handleOpen} className="mobile:block hidden">
            <BurgerIcon className="text-[#22202E] transition-colors hover:text-[#22202E]/80" />
          </button>
        </div>
      </div>
      <BurgerWindow isOpen={isOpen} />
      <UserModal className="mr-10" isUserModalOpen={isUserModalOpen} />
    </section>
  );
}
