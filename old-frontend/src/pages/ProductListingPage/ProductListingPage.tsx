import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  JoinComponent,
  PopUpModal,
  WhatMakesComponent,
} from "../../components/ReusedComponents";
import {
  AboutProductComponent,
  YouMightLike,
} from "./ProductListingPageComponents";

export const ProductListingPage = () => {
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <AboutProductComponent />
      <YouMightLike />
      <WhatMakesComponent />
      <JoinComponent />
      <Footer />
    </div>
  );
};
