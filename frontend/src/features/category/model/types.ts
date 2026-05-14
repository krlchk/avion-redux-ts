export interface Category {
  id: string;
  name: string;
  productsCount: number;
}

export interface CategoryResponse {
  data: Category[];
}
