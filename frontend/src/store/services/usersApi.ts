import { DesignerResponse, UserResponse } from "@/features/user/model/types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserResponse, void>({
      query: (params) => ({
        url: "/users",
        params: params ?? undefined,
      }),
      providesTags: ["Users"],
    }),

    getDesigners: build.query<DesignerResponse, void>({
      query: (params) => ({
        url: "/users/designers",
        params: params ?? undefined,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetDesignersQuery } = usersApi;
