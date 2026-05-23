import {
  CategoryDetails,
  CategoryFormPayload,
  CategoryResponse,
  UpdateCategoryRequest,
} from "@/features/category/model/types";
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

    getCategoryById: build.query<CategoryDetails, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),

    createCategory: build.mutation<CategoryDetails, CategoryFormPayload>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: build.mutation<CategoryDetails, UpdateCategoryRequest>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: build.mutation<CategoryDetails, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
