import { Order } from "@/features/order/model/types";
import type { CreateOrderRequest } from "../model/types";
import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
