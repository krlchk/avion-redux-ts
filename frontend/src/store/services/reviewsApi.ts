import { baseApi } from "./baseApi";
import {
  CreateReviewRequest,
  Review,
  ReviewResponse,
} from "@/features/review/model/types";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewByProductId: build.query<ReviewResponse, string>({
      query: (id) => `/reviews/product/${id}`,
      providesTags: ["Reviews"],
    }),
    createReview: build.mutation<Review, CreateReviewRequest>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewByProductIdQuery, useCreateReviewMutation } =
  reviewsApi;
