import { IDesigner, IType } from "../components/store/products/products-types";

export const getOptionLabel = (
  option: IType | IDesigner | { id: number; price: string },
): string => {
  if ("name" in option) return option.name;
  if ("full_name" in option) return option.full_name;
  if ("price" in option) return option.price;
  return "";
};
