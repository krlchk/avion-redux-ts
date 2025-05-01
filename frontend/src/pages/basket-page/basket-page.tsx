import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { PopUpModal } from "../../components/reused-components";
import { MainBusketComponent } from "./basket-page-components";

export const BasketPage = () => {
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <MainBusketComponent />
      <Footer />
    </div>
  );
};
