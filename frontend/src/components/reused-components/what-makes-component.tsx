import { CardComponent } from "./card-component";
import { cardsData } from "./CONSTANTS/constants";

export const WhatMakesComponent = () => {
  return (
    <section className="container">
      <div className="flex flex-col font-DMSans font-normal leading-snug text-[#2A254B]">
        <p className="flex justify-center text-2xl">
          What makes our brand different
        </p>
        <div className="mt-12 grid grid-cols-4 gap-14 mobile:grid-cols-2 xs:grid-cols-1">
          {cardsData.map((card, index) => (
            <CardComponent
              key={index}
              IconComponent={card.Icon}
              header={card.header}
              paragraph={card.paragraph}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
