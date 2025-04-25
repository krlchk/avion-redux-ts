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
      <GetInTouchConponent onScrollClick={scrollToJoin} />
      <Footer />
    </div>
  );
};
