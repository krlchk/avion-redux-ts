import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import {
  JoinComponent,
  PopUpModal,
  WhatMakesComponent,
} from "../../components/reused-components";
import {
  AboutProductComponent,
  YouMightLike,
} from "./product-listing-page-components";

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
