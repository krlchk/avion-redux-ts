import { HomeHeroProductCardProps } from "../model/types";

export const HomeHeroProductCard = ({
  img,
  title,
  stock,
  price,
}: HomeHeroProductCardProps) => {
  return (
    <div
      className="group tablet:min-h-96 mobile:min-h-64 xs:min-h-60 relative min-h-52 cursor-pointer overflow-hidden border border-white/10 bg-cover bg-center shadow-[0_24px_60px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:shadow-[0_34px_90px_rgba(0,0,0,0.46)]"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[#947458]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#947458]/35" />
      <div className="mobile:p-4 absolute inset-x-0 bottom-0 translate-y-5 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="mobile:text-lg mobile:leading-5 line-clamp-2 text-xl leading-6 font-bold text-white">
          {title}
        </h3>
        <p className="mobile:text-xs mt-2 text-sm font-medium text-white/75">
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
      </div>
      <p className="mobile:text-base absolute top-3 left-3 bg-[#f5f5f5] px-3 py-1 text-xl font-bold text-[#947458] transition-colors duration-300 group-hover:bg-[#947458] group-hover:text-white">
        ${price}
      </p>
    </div>
  );
};
