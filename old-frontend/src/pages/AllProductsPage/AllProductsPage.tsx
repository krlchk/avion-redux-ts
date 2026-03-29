import { useAppSelector } from "../../app/hooks";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PopUpModal } from "../../components/ReusedComponents";
import {
  AllProductsHeroComponent,
  AllProductsModalWindow,
  ProductsCatalogComponent,
  SortingComponent,
} from "./AllProductsComponents";

export const AllProductsPage = () => {
  const { isAddProductModalOpen } = useAppSelector((state) => state.root.ui);
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <AllProductsHeroComponent />
      <div className="container grid grid-cols-4 xs:grid-cols-1">
        <SortingComponent />
        <ProductsCatalogComponent />
      </div>
      <Footer />
      {isAddProductModalOpen ? <AllProductsModalWindow /> : null}
    </div>
  );
};
