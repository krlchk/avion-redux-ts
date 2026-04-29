export type ApiDecimal = string | number;

export type SortOrder = "asc" | "desc";

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
}
