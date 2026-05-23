export interface Category {
  id: string;
  name: string;
  productsCount: number;
}

export interface CategoryDetails {
  id: string;
  name: string;
}

export interface CategoryResponse {
  data: Category[];
}

export interface CategoryFormPayload {
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  data: Partial<CategoryFormPayload>;
}
