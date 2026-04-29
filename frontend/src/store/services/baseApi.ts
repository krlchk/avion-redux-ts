import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  }),
  tagTypes: [
    "Auth",
    "Categories",
    "Orders",
    "Payments",
    "Products",
    "Promocodes",
    "Reviews",
    "Users",
  ],
  endpoints: () => ({}),
});

export const {} = baseApi;
