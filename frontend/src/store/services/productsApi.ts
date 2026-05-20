import {
  ProductResponse,
  ProductQuery,
  Product,
} from "@/features/product/model/types";
import { baseApi } from "./baseApi";

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
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
