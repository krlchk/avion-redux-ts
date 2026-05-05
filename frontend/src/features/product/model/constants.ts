import {
  Armchair,
  Cabinet,
  Sofa,
  Chair,
  PaymentV2,
  Return,
  Support,
  Decor,
} from "@/shared/icons";

import img from "../ui/Img.png";
import { ProductCatalogCardProps } from "./types";

export const categories = [
  { title: "Armchairs", count: "1", Icon: Armchair },
  { title: "Cabinets", count: "1", Icon: Cabinet },
  { title: "Sofas", count: "1", Icon: Sofa },
  { title: "Chairs", count: "1", Icon: Chair },
  { title: "Decor", count: "1", Icon: Decor },
];

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

export const categoryOptions = [
  { value: "chairs", label: "Chairs", count: 10 },
  { value: "beds", label: "Beds", count: 10 },
  { value: "cabinets", label: "Cabinets", count: 10 },
  { value: "sofas", label: "Sofas", count: 10 },
  { value: "decor", label: "Decor", count: 10 },
  { value: "sale", label: "Sale", count: 10 },
];

export const mockFurnitureProducts: ProductCatalogCardProps[] = [
  { id: "coffee-table", title: "Coffee Table", price: "150", image: img },
  {
    id: "papasan-chair",
    title: "Papasan Chair",
    price: "250",
    image: img,
    badge: "sale",
  },
  { id: "classic-chair", title: "Classic Chair", price: "99", image: img },
  {
    id: "modern-armchair",
    title: "Modern Armchair",
    price: "250",
    image: img,
    badge: "new",
  },
  {
    id: "classic-armchair",
    title: "Classic Armchair",
    price: "180",
    image: img,
  },
  { id: "bar-stool", title: "Bar Stool", price: "250", image: img },
  { id: "nightstand", title: "Nightstand", price: "80", image: img },
  { id: "white-table", title: "White Table", price: "250", image: img },
  { id: "egg-chair", title: "Egg Chair", price: "280", image: img },
  {
    id: "chaise-lounge",
    title: "Chaise Lounge",
    price: "450",
    image: img,
    badge: "new",
  },
  { id: "modern-bed", title: "Modern Bed", price: "680", image: img },
  {
    id: "folding-table",
    title: "Folding Table",
    price: "160",
    image: img,
    badge: "sale",
  },
];
