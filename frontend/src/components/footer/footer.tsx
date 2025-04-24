import clsx from "clsx";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, SkypeIcon } from "./icons";
import { EmailComponent } from "../reused-components";

export function Footer({ className }:{className:string}) {
  const menu = [
    { name: "Homepage", to: "/" },
    { name: "About Us", to: "/aboutus" },
    { name: "All products", to: "/allproducts" },
    { name: "Your basket", to: "/basket-page" },
  ];

  return (
    <footer className={clsx(className, "bg-[#2A254B]")}>
      <div className="grid grid-cols-2 font-DMSans text-base font-normal text-white mobile:grid-cols-1">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl">Navigation menu</p>
          {menu.map((item, index) => (
            <Link
              className="inline-flex cursor-default transition-colors"
              to={item.to}
              key={index}
            >
              <p className="cursor-pointer hover:text-gray-400">{item.name}</p>
            </Link>
          ))}
        </div>

        <div className="grid mobile:mt-20 xs:col-span-1">
          <div className="flex flex-col items-center">
            <p className="text-xl">Join our mailing list</p>
            <EmailComponent
              inputClassName="bg-violet-800/30"
              buttonColor="lightBlue"
              className="mt-4 mobile:mt-2"
            />
          </div>
        </div>
      </div>
      <hr className="mt-12 border-[#4E4D93]" />
      <div>
        <div className="mt-6 flex justify-between mobile:flex-col mobile:items-center">
          <p className="text-lg text-white">Copyright 2025 Avion LTD</p>
          <div className="flex gap-6 text-white mobile:mt-5">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="transition-colors hover:text-gray-400" />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="transition-colors hover:text-gray-400" />
            </Link>
            <Link
              to="https://skype.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SkypeIcon className="transition-colors hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}