import { ArrowLeft, ArrowRight } from "@/shared/icons";
import { useCallback, useEffect, useState } from "react";
import { homeReviews } from "../modes/constants";
import { HomeReviewsSlider } from "./HomeReviewsSlider";

export const HomeReviews = () => {
  const [reviewSlideDirection, setReviewSlideDirection] = useState<
    "next" | "prev"
  >("next");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const activeReview = homeReviews[activeReviewIndex];
  const onNextReview = useCallback(() => {
    if (homeReviews.length === 0) return;

    setReviewSlideDirection("next");
    setActiveReviewIndex((reviewIndex) =>
      reviewIndex === homeReviews.length - 1 ? 0 : reviewIndex + 1,
    );
  }, []);

  const onPrevReview = useCallback(() => {
    if (homeReviews.length === 0) return;

    setReviewSlideDirection("prev");
    setActiveReviewIndex((reviewIndex) =>
      reviewIndex === 0 ? homeReviews.length - 1 : reviewIndex - 1,
    );
  }, []);

  useEffect(() => {
    if (isSliderPaused) return;

    const interval = window.setInterval(() => {
      onNextReview();
    }, 4000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isSliderPaused, onNextReview]);

  return (
    <div className="tablet:flex-col mobile:flex-col flex w-full">
      <div className="tablet:w-full mobile:w-full w-1/2 overflow-hidden bg-[#eeedec]">
        <section className="tablet:px-16 tablet:py-28 mobile:px-6 mobile:py-16 flex min-h-full flex-col px-32 py-52 text-black">
          <h2 className="mobile:text-3xl mobile:leading-10 text-4xl leading-13 font-bold">
            Customer Reviews
          </h2>
          {activeReview && (
            <HomeReviewsSlider
              review={activeReview}
              slideDirection={reviewSlideDirection}
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
            />
          )}
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              onClick={onPrevReview}
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
              type="button"
              aria-label="Previous review"
            >
              <ArrowLeft className="size-6 transition-colors group-hover:stroke-[#947458]" />
            </button>
            <button
              onClick={onNextReview}
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
              type="button"
              aria-label="Next review"
            >
              <ArrowRight className="size-6 transition-colors group-hover:stroke-[#947458]" />
            </button>
          </div>
        </section>
      </div>
      <div className="tablet:min-h-120 tablet:w-full mobile:min-h-100 mobile:w-full w-1/2 bg-[url('/images/home/review.jpg')] bg-cover bg-center" />
    </div>
  );
};
