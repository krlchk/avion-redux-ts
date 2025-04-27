import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import {
    GetInTouchComponent,
  JoinComponent,
  PopUpModal,
  WhatMakesComponent,
} from "../../components/reused-components";
import { useSmoothScroll } from "../../hooks/use-smoth-scroll";
import { AboutPageHero, PostHeaderComponent } from "./about-page-components";

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
