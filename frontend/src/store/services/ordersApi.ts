import {
  Order,
  OrdersRequest,
  OrdersResponse,
} from "@/features/order/model/types";
import type { CreateOrderRequest, MyOrdersRequest } from "../model/types";
import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrdersResponse, OrdersRequest | void>({
      query: (params) => ({
        url: "/orders",
        params: params ?? undefined,
      }),
      providesTags: ["Orders"],
    }),

    getMyOrders: build.query<OrdersResponse, MyOrdersRequest | void>({
      query: (params) => ({
        url: "/orders/my",
        params: params ?? undefined,
      }),
      providesTags: ["Orders"],
    }),

    getOrderById: build.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Orders"],
    }),

    getAdminOrderById: build.query<Order, string>({
      query: (orderId) => `/orders/admin/${orderId}`,
      providesTags: ["Orders"],
    }),

    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
    cancelOrder: build.mutation<Order, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
  }),
});

export const {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetAdminOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
} = ordersApi;
