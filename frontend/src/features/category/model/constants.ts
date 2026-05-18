import { Armchair, Chair, Decor, Sofa, Table } from "@/shared/icons";

export const categoryIcons = {
  Armchairs: Armchair,
  Sofas: Sofa,
  Chairs: Chair,
  Decor: Decor,
  Tables: Table,
} as const;

export const getCategoryIcon = (name: string) => {
  return (
    categoryIcons[name as keyof typeof categoryIcons] ?? categoryIcons.Chairs
  );
};
