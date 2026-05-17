import { HomeCategoryCardProps } from "../model/types";

export const HomeCategoryCard = ({ category }: HomeCategoryCardProps) => {
  const { name, productsCount, image } = category;

  return (
    <div
      className="group relative min-h-72 cursor-pointer overflow-hidden border-2 border-white bg-cover bg-center shadow-[0_24px_60px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:shadow-[0_34px_90px_rgba(0,0,0,0.46)]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[#947458]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#947458]/35" />
      <div className="absolute inset-x-0 bottom-0 translate-y-5 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-xl leading-6 font-bold text-white">
          {productsCount} products
        </h3>
      </div>
      <p className="absolute top-3 left-3 px-3 py-1 text-xl font-bold text-white">
        {name}
      </p>
    </div>
  );
};
