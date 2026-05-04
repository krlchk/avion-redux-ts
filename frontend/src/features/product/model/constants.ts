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
