import { baseApi } from "./baseApi";
import { ReviewResponse } from "@/features/review/model/types";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewByProductId: build.query<ReviewResponse, string>({
      query: (id) => `/reviews/product/${id}`,
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewByProductIdQuery } = reviewsApi;
