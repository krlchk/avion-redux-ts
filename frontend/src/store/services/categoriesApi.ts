import { Category, CategoryResponse } from "@/features/category/model/types";
import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryResponse, void>({
      query: (params) => ({
        url: "/categories",
        params: params ?? undefined,
      }),
      providesTags: ["Categories"],
    }),

    getCategoryById: build.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoriesApi;
