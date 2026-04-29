import { ProductQuery, ProductResponse } from "@/entities/product/types";
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
  }),
});

export const { useGetProductsQuery } = productsApi;
