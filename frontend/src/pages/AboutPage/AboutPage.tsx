import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  GetInTouchComponent,
  JoinComponent,
  PopUpModal,
  WhatMakesComponent,
} from "../../components/ReusedComponents";
import { useSmoothScroll } from "../../hooks/use-smoth-scroll";
import { AboutPageHero, PostHeaderComponent } from "./AboutPageComponents";

export const AboutPage = () => {
  const [ref, scrollIntoView] = useSmoothScroll<HTMLElement>();
  return (
    <div className="mx-auto max-w-[1700px]">
      <PopUpModal />
      <Header />
      <PostHeaderComponent />
      <AboutPageHero />
      <GetInTouchComponent onScrollClick={scrollIntoView} />
      <WhatMakesComponent />
      <JoinComponent ref={ref} />
      <Footer />
    </div>
  );
};
