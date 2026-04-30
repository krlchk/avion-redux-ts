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
