import { Container } from "@/shared/ui";

export const AboutUsTwoImages = () => {
  return (
    <>
      <div className="tablet:min-h-130 mobile:min-h-90 relative min-h-180 overflow-hidden">
        <div className="animate-[hero-zoom_18s_ease-in-out_infinite] absolute inset-0 bg-[url('/images/aboutUs/aboutUsOne.jpg')] bg-cover bg-center will-change-transform" />
      </div>
      <Container className="tablet:gap-14 tablet:py-20 mobile:gap-10 mobile:py-14 flex flex-col gap-20 py-28 text-black">
        <h1 className="tablet:text-4xl tablet:leading-12 mobile:text-3xl mobile:leading-10 mx-auto max-w-5xl text-center text-5xl leading-16.25 font-bold">
          Thoughtfully designed furniture for calm, comfortable and beautifully
          lived-in homes.
        </h1>
        <div className="mobile:flex-col tablet:gap-12 flex w-full gap-20 text-base font-normal text-black/70">
          <p className="mobile:w-full w-1/2 leading-7">
            Avion brings together refined silhouettes, durable materials and
            everyday comfort. Every piece is selected to feel timeless rather
            than trend-led, so your home can evolve without losing its sense of
            warmth and balance.
          </p>
          <p className="mobile:w-full w-1/2 leading-7">
            We work with designers and makers who care about proportion, texture
            and longevity. From statement chairs to quiet storage pieces, our
            collection is built around furniture that looks considered and feels
            easy to live with.
          </p>
        </div>
      </Container>
      <div className="tablet:min-h-130 mobile:min-h-90 relative min-h-180 overflow-hidden">
        <div className="animate-[hero-zoom_18s_ease-in-out_infinite] absolute inset-0 bg-[url('/images/aboutUs/aboutUsTwo.jpg')] bg-cover bg-center will-change-transform" />
      </div>
    </>
  );
};
