import Link from "next/link";
import { HomeFeaturedCollectionCardProps } from "../model/types";

export const HomeFeaturedCollectionCard = ({
  collection,
}: HomeFeaturedCollectionCardProps) => {
  const { title, description, image, href } = collection;

  return (
    <section className="group flex flex-col gap-6 text-black">
      <div
        className="tablet:min-h-90 mobile:min-h-72 min-h-104 overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:-translate-y-1"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-col gap-4">
        <h3 className="mobile:text-2xl text-2xl leading-7.75 font-bold">
          {title}
        </h3>
        <p className="max-w-xl text-base leading-7 font-normal text-black/60">
          {description}
        </p>
      </div>
      <Link
        href={href}
        className="flex w-fit max-h-12 shrink-0 cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
      >
        Shop now
      </Link>
    </section>
  );
};
