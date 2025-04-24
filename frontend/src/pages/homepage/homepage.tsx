import { useRef } from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import {
  GetInTouchConponent,
  JoinComponent,
  PopUpModal,
  SliderComponent,
  WhatMakesComponent,
} from "../../components/reused-components";
import { Hero } from "./homepage-components";

export const Homepage = () => {
  const scrollTargetRef = useRef(null);
  const handleScroleFunction = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal className="" />
      <Header className="container" />
      <Hero className="container mobile:px-0" />
      <WhatMakesComponent className="container" />
      <SliderComponent className="container" />
      <JoinComponent ref={scrollTargetRef} className="container" />
      <GetInTouchConponent
        handleScrole={handleScroleFunction}
        className="pt-16"
      />
      <Footer className="container" />
    </div>
  );
};
