import { StaticImageData } from "next/image";

export interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
}

export interface LoaderProps {
  styles?: string;
}

export interface ProductCardProps {
  id?: string;
  title: string;
  image: string | StaticImageData | null;
  price: string;
  oldPrice?: string;
  badge?: "new" | "sale";
  isDiscount?: boolean;
}
