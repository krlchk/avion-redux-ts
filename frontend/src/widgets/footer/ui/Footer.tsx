"use client";

import { MainFooter } from "./MainFooter";
import { TopFooter } from "./TopFooter";

export const Footer = () => {
  return (
    <footer className="mobile:gap-12 flex w-full flex-col gap-20 bg-[#eeedec] pt-14 pb-5 text-black">
      <TopFooter />
      <MainFooter />
    </footer>
  );
};
