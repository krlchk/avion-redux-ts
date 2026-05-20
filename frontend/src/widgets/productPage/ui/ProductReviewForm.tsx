"use client";

import { FormSubmitHandler } from "@/shared/model/types";
import { Star } from "@/shared/icons";
import { Loader } from "@/shared/ui";
import { useCreateReviewMutation } from "@/store/services/reviewsApi";
import { useState } from "react";

import {
  ProductReviewFormErrors,
  ProductReviewFormProps,
} from "../model/types";
import { validateProductReviewForm } from "../model/productReviewForm.utils";

export const ProductReviewForm = ({ productId }: ProductReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<ProductReviewFormErrors>({});
  const [createReview, { isLoading, isSuccess, isError, reset }] =
    useCreateReviewMutation();

  const handleRatingChange = (value: number) => {
    setRating(value);
    setErrors((currentErrors) => ({ ...currentErrors, rating: undefined }));

    if (isSuccess || isError) {
      reset();
    }
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    setErrors((currentErrors) => ({ ...currentErrors, comment: undefined }));

    if (isSuccess || isError) {
      reset();
    }
  };

  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateProductReviewForm(rating, comment);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await createReview({
        productId,
        rating,
        comment: comment.trim() || undefined,
      }).unwrap();

      setRating(0);
      setComment("");
      setErrors({});
    } catch {
      console.log("Create review error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-14 border-t border-[#947458]/20 bg-[#f5f5f5] pt-6 text-black"
    >
      <div className="mobile:flex-col mobile:items-start flex items-center justify-between gap-4">
        <div>
          <h3 className="text-4xl font-bold text-black">Leave a review</h3>
          <p className="mt-2 leading-7 text-lg font-medium text-black/50">
            Share your experience with this product.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const starValue = index + 1;

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => handleRatingChange(starValue)}
                  className="cursor-pointer transition-transform hover:scale-110"
                  aria-label={`Rate ${starValue} out of 5`}
                >
                  <Star
                    className="h-6 w-6"
                    fill={starValue <= rating ? "#947458" : "#d8d1ca"}
                  />
                </button>
              );
            })}
          </div>
          {errors.rating && (
            <span className="text-sm font-medium text-[#FB5454]">
              {errors.rating}
            </span>
          )}
        </div>
      </div>

      <label className="mt-6 flex flex-col leading-7 text-lg gap-2 font-bold text-black">
        Comment
        <textarea
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder="Tell us what stood out..."
          className={`min-h-32 resize-none border bg-white px-4 py-4 leading-7 text-lg font-medium text-black/70 transition-colors outline-none placeholder:text-black/30 focus:border-[#947458] ${
            errors.comment ? "border-[#FB5454]" : "border-black/10"
          }`}
        />
        {errors.comment && (
          <span className="text-sm font-medium text-[#FB5454]">
            {errors.comment}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="mobile:w-full mt-6 flex min-h-13 cursor-pointer items-center justify-center bg-[#947458] px-10 py-3 text-lg font-bold text-[#f5f5f5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <Loader styles="h-6 w-6 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
        ) : (
          "Submit review"
        )}
      </button>

      {isSuccess && (
        <p className="mt-3 text-sm font-medium text-[#947458]">
          Review submitted successfully.
        </p>
      )}
      {isError && (
        <p className="mt-3 text-sm font-medium text-[#FB5454]">
          Failed to submit review. Please make sure you are signed in and have
          purchased this product.
        </p>
      )}
    </form>
  );
};
