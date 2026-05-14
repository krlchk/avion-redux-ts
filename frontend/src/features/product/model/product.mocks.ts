import { PaymentV2, Return, Support } from "@/shared/icons";
import img from "../ui/Img.png";
import { ProductCatalogCardProps } from "./types";

export const benefits = [
  {
    title: "Secure Payments",
    desc: "Feugiat mi gravida vestibulum orci ac volutpat non",
    Icon: PaymentV2,
  },
  {
    title: "Return Within 14 Days",
    desc: "Urna elementum eget quam facilisi vulputate",
    Icon: Return,
  },
  {
    title: "24/7 Support",
    desc: "Semper turpis sed maecenas vivamus vel scelerisque",
    Icon: Support,
  },
];

export const mockFurnitureProducts: ProductCatalogCardProps[] = [
  {
    id: "1",
    title: "Modern Armchair",
    image: img,
    price: "250",
    oldPrice: "300",
    badge: "new",
    isDiscount: true,
  },
  {
    id: "2",
    title: "Folding Table",
    image: img,
    price: "160",
    isDiscount: false,
  },
  {
    id: "3",
    title: "Classic Chair",
    image: img,
    price: "99",
    isDiscount: false,
  },
];
