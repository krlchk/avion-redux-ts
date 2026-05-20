export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  productId: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
  };
}

export interface ReviewResponse {
  data: Review[];
  meta: ReviewsMeta;
}

export interface ReviewsMeta {
  averageRating: number;
  reviewsCount: number;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  comment?: string;
}
