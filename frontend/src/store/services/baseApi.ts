import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
          for (const item of value) {
            searchParams.append(key, String(item));
          }
        } else {
          searchParams.append(key, String(value));
        }
      }

      return searchParams.toString();
    },
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
