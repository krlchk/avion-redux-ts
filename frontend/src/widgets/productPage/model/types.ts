export interface ProductDetailsProps {
  productId: string;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductReviewFormProps {
  productId: string;
}

export interface ProductReviewFormErrors {
  rating?: string;
  comment?: string;
}
