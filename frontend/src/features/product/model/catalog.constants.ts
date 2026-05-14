import { SortQueryMapType } from "./types";

export const PRODUCTS_PER_PAGE = 9;

export const defaultPriceRange = [99, 9999];

export const sortOptions = [
  { value: "latest", title: "Sort by latest" },
  { value: "oldest", title: "Sort by oldest" },
  { value: "price-asc", title: "Price: Low to High" },
  { value: "price-desc", title: "Price: High to Low" },
];

export const sortQueryMap: SortQueryMapType = {
  latest: { sortBy: "createdAt", sortOrder: "desc" },
  oldest: { sortBy: "createdAt", sortOrder: "asc" },
  "price-asc": { sortBy: "price", sortOrder: "asc" },
  "price-desc": { sortBy: "price", sortOrder: "desc" },
};