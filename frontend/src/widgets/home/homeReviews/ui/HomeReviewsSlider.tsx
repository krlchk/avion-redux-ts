import { Avatar, Star } from "@/shared/icons";
import { AnimatePresence, motion } from "motion/react";
import { HomeReviewsSliderProps } from "../model/types";

export const HomeReviewsSlider = ({
  review,
  slideDirection,
  onMouseEnter,
  onMouseLeave,
}: HomeReviewsSliderProps) => {
  return (
    <div
      className="overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={review.id}
          initial={{
            opacity: 0,
            x: slideDirection === "next" ? 48 : -48,
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: slideDirection === "next" ? -48 : 48,
          }}
          transition={{ duration: 0.36, ease: "easeOut" }}
        >
          <div className="mt-10 flex gap-1">
            {Array.from({ length: review.starsCount }).map((_, index) => (
              <Star key={index} />
            ))}
          </div>
          <p className="mt-6 text-base leading-6.5 font-normal text-black/70">
            {review.text}
          </p>
          <div className="mt-10 flex w-fit items-center justify-between gap-5 rounded-xl py-2">
            <Avatar className="size-16 fill-black/70" />
            <div>
              <p className="text-base font-bold">{review.name}</p>
              <p className="text-sm font-normal">{review.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
