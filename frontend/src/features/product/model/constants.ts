import { PaymentV2, Return, Support } from "@/shared/icons";

import img from "../ui/Img.png";
import { Product, ProductCatalogCardProps } from "./types";

export const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
export const defaultPriceRange = [99, 9999];
export const PRODUCTS_PER_PAGE = 9;

export const sortOptions = [
  { value: "latest", title: "Sort by latest" },
  { value: "oldest", title: "Sort by oldest" },
  { value: "price-asc", title: "Price: Low to High" },
  { value: "price-desc", title: "Price: High to Low" },
];

export const isProductNew = (createdAt: string, now: Date) => {
  const createdTime = new Date(createdAt).getTime();
  return now.getTime() - createdTime <= THREE_DAYS_MS;
};

export const isProductSale = (product: Product, now: Date) => {
  if (!product.discountPercent || product.discountPercent <= 0) {
    return false;
  }

  if (!product.discountUntil) {
    return true;
  }

  return new Date(product.discountUntil).getTime() > now.getTime();
};

export const getProductBadge = (
  product: Product,
  now: Date,
): "new" | "sale" | undefined => {
  const isSale = isProductSale(product, now);
  if (isSale) {
    return "sale";
  }
  if (isProductNew(product.createdAt, now)) {
    return "new";
  }
  return undefined;
};

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

export const designerOptions = [
  { value: "albert-hadley", label: "Albert Hadley", count: 8 },
  { value: "kelly-wearstler", label: "Kelly Wearstler", count: 12 },
  { value: "philippe-starck", label: "Philippe Starck", count: 6 },
  { value: "patricia-urquiola", label: "Patricia Urquiola", count: 9 },
  { value: "charles-eames", label: "Charles Eames", count: 15 },
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
