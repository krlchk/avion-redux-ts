export interface HomeReview {
  id: string;
  name: string;
  role: string;
  text: string;
  starsCount: number;
}

export interface HomeReviewsSliderProps {
  review: HomeReview;
  slideDirection: "next" | "prev";
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
