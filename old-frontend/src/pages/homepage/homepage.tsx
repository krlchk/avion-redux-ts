import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  GetInTouchComponent,
  JoinComponent,
  PopUpModal,
  SliderComponent,
  WhatMakesComponent,
} from "../../components/ReusedComponents";
import { Hero } from "./HomepageComponents";
import { useSmoothScroll } from "../../hooks/use-smoth-scroll";

export const Homepage = () => {
  const [joinRef, scrollToJoin] = useSmoothScroll<HTMLElement>();

  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <Hero />
      <WhatMakesComponent />
      <SliderComponent />
      <JoinComponent ref={joinRef} />
      <GetInTouchComponent onScrollClick={scrollToJoin} />
      <Footer />
    </div>
  );
};
