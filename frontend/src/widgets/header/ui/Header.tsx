"use client";

import { MainHeader } from "./MainHeader";
import { TopHeader } from "./TopHeader";

export const Header = () => {
  return (
    <header className="flex w-full flex-col">
      <TopHeader />
      <MainHeader />
    </header>
  );
};
