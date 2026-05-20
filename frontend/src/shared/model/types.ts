import { StaticImageData } from "next/image";
import { type ComponentProps } from "react";

export interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export interface SimpleButtonProps {
  text: string | React.ReactNode;
  onClick?: () => void;
}

export interface LoaderProps {
  styles?: string;
}

export interface IconProps {
  className?: string;
  stroke?: string;
  fill?: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  image: string | StaticImageData | null;
  price: string;
  oldPrice?: string;
  badge?: "new" | "sale";
  isDiscount?: boolean;
}

export type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
