import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { PopUpModal } from "../../components/reused-components";
import {
  AllProductsHeroComponent,
  ProductsCatalogComponent,
  SortingComponent,
} from "./all-products-components";

export const AllProductsPage = () => {
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <AllProductsHeroComponent />
      <div className="container grid grid-cols-4 xs:grid-cols-1">
        <SortingComponent
        />
        <ProductsCatalogComponent />
      </div>
      <Footer />
    </div>
  );
};
