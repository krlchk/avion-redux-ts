"use client";

import { MainHeader } from "./MainHeader";
import { TopHeader } from "./TopHeader";

export const Header = () => {
  return (
    <header className="flex w-full flex-col bg-[#f5f5f5]">
      <TopHeader />
      <MainHeader />
    </header>
  );
};
