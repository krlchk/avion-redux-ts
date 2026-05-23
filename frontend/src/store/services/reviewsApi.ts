import { baseApi } from "./baseApi";
import {
  CreateReviewRequest,
  Review,
  ReviewResponse,
  ReviewsResponse,
} from "@/features/review/model/types";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<ReviewsResponse, void>({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),

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
      invalidatesTags: ["Reviews", "Products"],
    }),

    deleteReview: build.mutation<Review, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Products"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewByProductIdQuery,
  useGetReviewsQuery,
} = reviewsApi;
