import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f5f5f5]">{children}</main>
      <Footer />
    </>
  );
};
