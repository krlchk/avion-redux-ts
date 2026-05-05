import Image from "next/image";
import { ProductCatalogCardProps } from "../../model/types";

export const ProductCatalogCard = ({
  id,
  title,
  image,
  price,
  badge,
}: ProductCatalogCardProps) => {
  return (
    <div key={id} className="relative flex flex-col gap-6 text-center">
      <div className="relative aspect-306/350 w-full bg-[#F6F4F2]">
        <Image
          alt={title}
          src={image}
          fill
          sizes="(max-width: 834px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="mobile:text-xl text-2xl font-bold text-black">{title}</p>
        <p className="mobile:text-base mt-5 text-xl font-medium text-black/60">
          ${price}
        </p>
      </div>
      {badge && (
        <div
          className={`absolute top-6 left-6 px-5 py-2 text-xl font-normal text-white uppercase ${
            badge === "new" ? "bg-black" : "bg-[#FB5454]"
          }`}
        >
          {badge}
        </div>
      )}
    </div>
  );
};
