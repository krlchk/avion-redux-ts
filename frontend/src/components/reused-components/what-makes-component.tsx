import clsx from "clsx";
import {
  IconFour,
  IconOne,
  IconThree,
  IconTwo,
} from "./icons/what-makes-component-icons";

export function WhatMakesComponent({ className }: { className: string }) {
  const cardsData = [
    {
      Icon: IconOne,
      header: "Next day as standard",
      paragraph: "Order before 3pm and get your order the next day as standard",
    },
    {
      Icon: IconTwo,
      header: "Made by true artisans",
      paragraph:
        "Handmade crafted goods made with real passion and craftsmanship",
    },
    {
      Icon: IconThree,
      header: "Unbeatable prices",
      paragraph:
        "For our materials and quality you won’t find better prices anywhere",
    },
    {
      Icon: IconFour,
      header: "Recycled packaging",
      paragraph:
        "We use 100% recycled packaging to ensure our footprint is manageable",
    },
  ];

  return (
    <section className={clsx(className, "")}>
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
}

function CardComponent({
  header,
  paragraph,
  IconComponent: Icon,
}: {
  header: string;
  paragraph: string;
  IconComponent: React.FC<{ className: string }>;
}) {
  return (
    <div>
      <div>{<Icon className="" />}</div>
      <p className="mt-4 text-xl">{header}</p>
      <p className="mt-2 text-base">{paragraph}</p>
    </div>
  );
}
