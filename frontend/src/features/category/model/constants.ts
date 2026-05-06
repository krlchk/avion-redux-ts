import { Armchair, Cabinet, Chair, Decor, Sofa } from "@/shared/icons";

export const categoryIcons = {
  Armchairs: Armchair,
  Cabinets: Cabinet,
  Sofas: Sofa,
  Chairs: Chair,
  Decor: Decor,
} as const;

export const getCategoryIcon = (name: string) => {
  return (
    categoryIcons[name as keyof typeof categoryIcons] ?? categoryIcons.Chairs
  );
};
