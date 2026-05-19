import { categoryIcons } from "@/features/category/model/constants";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AboutUsCategoryStatCardProps } from "../model/types";

export const AboutUsCategoryStatCard = ({
  category,
}: AboutUsCategoryStatCardProps) => {
  const { name, productsCount } = category;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.45 });
  const [visibleProductsCount, setVisibleProductsCount] = useState(0);
  const Icon =
    categoryIcons[name as keyof typeof categoryIcons] ?? categoryIcons.Chairs;

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startCount = productsCount > 0 ? 1 : 0;
    const startedAt = performance.now();
    let animationFrameId = 0;

    const updateCount = (currentTime: number) => {
      const progress = Math.min((currentTime - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.round(
        (productsCount - startCount) * easedProgress + startCount,
      );

      setVisibleProductsCount(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, productsCount]);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#eeedec] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
    >
      <Icon className="shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <p className="mobile:text-4xl text-black/60 text-5xl leading-16.25 font-black">
        {visibleProductsCount}+
      </p>
      <p className="text-base leading-5.25 font-bold text-black/60">{name}</p>
    </div>
  );
};
