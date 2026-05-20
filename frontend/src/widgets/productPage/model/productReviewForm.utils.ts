import { ProductReviewFormErrors } from "./types";

export const validateProductReviewForm = (
  rating: number,
  comment: string,
) => {
  const errors: ProductReviewFormErrors = {};
  const trimmedComment = comment.trim();

  if (rating < 1 || rating > 5) {
    errors.rating = "Please select a rating.";
  }

  if (trimmedComment.length > 0 && trimmedComment.length < 8) {
    errors.comment = "Please write at least 8 characters.";
  }

  return errors;
};
