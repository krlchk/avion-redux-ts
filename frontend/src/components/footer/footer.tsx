import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, SkypeIcon } from "./icons";
import { EmailComponent } from "../reused-components";
import { menu } from "../reused-components/CONSTANTS/constants";

export const Footer = () => {
  return (
    <footer className="container bg-[#2A254B]">
      <div className="grid grid-cols-2 font-DMSans text-base font-normal text-white mobile:grid-cols-1">
        <div className="mx-auto flex flex-col gap-3">
          <p className="text-xl">Navigation menu</p>
          {menu.map((link) => (
            <Link
              className="inline-flex cursor-pointer transition-colors hover:text-gray-400"
              to={link.to}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="grid mobile:mt-20 xs:col-span-1">
          <div className="flex flex-col items-center">
            <p className="text-xl">Join our mailing list</p>
            <EmailComponent
              color="lightBlue"
              inputClassName="bg-violet-800/30"
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
              <FacebookIcon />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </Link>
            <Link
              to="https://skype.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SkypeIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
