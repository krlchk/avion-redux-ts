import image from "./static-images/get-in-touch-image.png";

interface IGetInTouchConponent {
  onScrollClick: () => void;
}

export function GetInTouchComponent({ onScrollClick }: IGetInTouchConponent) {
  return (
    <section className="pt-16 mobile:pt-0">
      <div className="grid grid-cols-2 font-DMSans text-base font-normal text-[#2A254B] mobile:grid-cols-1">
        <div className="px-20 py-16 tablet:pl-6 mobile:px-6">
          <h1 className="text-2xl">
            From a studio in London to a global brand with over 400 outlets
          </h1>
          <p className="mt-6 text-[#505977]">
            When we started Avion, the idea was simple. Make high quality
            furniture affordable and available for the mass market.
          </p>
          <p className="mt-4 text-[#505977]">
            Handmade, and lovingly crafted furniture and homeware is what we
            live, breathe and design so our Chelsea boutique become the hotbed
            for the London interior design community.
          </p>
          <button
            onClick={onScrollClick}
            className="mt-48 px-8 py-4 leading-6 transition-colors hover:text-[#2A254B]/70 mobile:mt-32"
          >
            Get in touch
          </button>
        </div>
        <div>
          <img className="h-full w-full object-cover" src={image} alt="" />
        </div>
      </div>
    </section>
  );
}
