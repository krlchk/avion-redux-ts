import { Star } from "@/shared/icons";

import { ProductReviewItem } from "../model/types";

interface ProductReviewsProps {
  reviews: ProductReviewItem[];
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-20 border-t border-[#947458]/20 pt-14 text-black">
      <div className="mobile:flex-col mobile:items-start flex items-end justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-[#947458] uppercase">
            Customer reviews
          </p>
          <h2 className="mt-3 text-4xl font-bold text-black">
            What people say
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="h-5 w-5"
                fill={index < Math.round(averageRating) ? "#947458" : "#d8d1ca"}
              />
            ))}
          </div>
          <p className="text-lg font-medium text-black/60">
            {averageRating.toFixed(1)} / 5
          </p>
        </div>
      </div>

      <div className="tablet:grid-cols-2 mobile:grid-cols-1 mt-10 grid grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <article
              key={review.id}
              className="border border-[#947458]/15 bg-[#f5f5f5] p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4"
                    fill={index < review.rating ? "#947458" : "#d8d1ca"}
                  />
                ))}
              </div>
              <p className="mt-5 text-lg leading-7 font-medium text-black/60">
                “{review.comment}”
              </p>
              <div className="mt-6">
                <p className="text-lg font-bold text-black">{review.author}</p>
                <p className="mt-1 text-sm font-medium text-black/40">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="tablet:col-span-2 mobile:col-span-1 col-span-3 flex min-h-40 items-center justify-center  bg-[#f5f5f5] text-lg font-medium text-black/50">
            No reviews yet
          </div>
        )}
      </div>
    </section>
  );
};
