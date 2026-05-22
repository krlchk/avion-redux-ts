import {
  DesignerResponse,
  Designer,
  User,
  UserResponse,
  ProfileResponse,
  CreateUserRequest,
} from "@/features/user/model/types";
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

    getDesignerById: build.query<Designer, string>({
      query: (id) => `/users/designers/${id}`,
      providesTags: ["Users"],
    }),

    getUserById: build.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    profile: build.query<ProfileResponse, void>({
      query: () => `/users/profile`,
      providesTags: ["Users"],
    }),

    createUser: build.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetDesignersQuery,
  useGetDesignerByIdQuery,
  useGetUserByIdQuery,
  useProfileQuery,
  useCreateUserMutation,
} = usersApi;
