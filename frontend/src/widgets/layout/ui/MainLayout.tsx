import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import type { MainLayoutProps } from "../model/types";

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f5f5f5]">{children}</main>
      <Footer />
    </>
  );
};
