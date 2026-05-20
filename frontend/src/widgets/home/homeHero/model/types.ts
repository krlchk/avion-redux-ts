import { Product } from "@/features/product/model/types";

export interface HomeHeroProps {
  heroProducts: Product[];
  isHeroProductsLoading: boolean;
  isHeroProductsError: boolean;
}

export interface HomeHeroProductCardProps {
  id: string;
  img: string;
  title: string;
  stock: number;
  price: string | number;
}
