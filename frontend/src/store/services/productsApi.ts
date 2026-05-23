import {
  ProductResponse,
  ProductQuery,
  Product,
  MyProductsResponse,
  ProductDiscountRequest,
  ProductFormPayload,
  ProductMutationResponse,
  UpdateProductRequest,
} from "@/features/product/model/types";
import { baseApi } from "./baseApi";

const buildProductFormData = (payload: Partial<ProductFormPayload>) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "image" && value instanceof File) {
      formData.append("img", value);
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductResponse, ProductQuery | void>({
      query: (params) => ({
        url: "/products",
        params: params ?? undefined,
      }),
      providesTags: ["Products"],
    }),

    getProductById: build.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    getMyProducts: build.query<MyProductsResponse, void>({
      query: () => "/products/my",
      providesTags: ["Products"],
    }),

    createProduct: build.mutation<ProductMutationResponse, ProductFormPayload>({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: buildProductFormData(payload),
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<ProductMutationResponse, UpdateProductRequest>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: buildProductFormData(data),
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<ProductMutationResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    setProductDiscount: build.mutation<
      ProductMutationResponse,
      ProductDiscountRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/products/${id}/discount`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetMyProductsQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useSetProductDiscountMutation,
  useUpdateProductMutation,
} = productsApi;
