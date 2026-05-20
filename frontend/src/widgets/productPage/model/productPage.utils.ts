import { Review } from "@/features/review/model/types";

export const mapProductReviewToItem = (review: Review) => ({
  id: review.id,
  author: review.user.name,
  rating: review.rating,
  comment: review.comment ?? "No comment provided.",
  createdAt: review.createdAt,
});

export const mapProductReviewsToItems = (reviews: Review[]) =>
  reviews.map(mapProductReviewToItem);
