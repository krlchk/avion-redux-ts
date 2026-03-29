import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PopUpModal } from "../../components/ReusedComponents";
import { MainBasketComponent } from "./BasketPageComponents";

export const BasketPage = () => {
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <MainBasketComponent />
      <Footer />
    </div>
  );
};
