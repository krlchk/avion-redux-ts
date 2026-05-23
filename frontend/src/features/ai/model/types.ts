export interface ProductAssistantRequest {
  productId: string;
  question: string;
}

export interface ProductAssistantResponse {
  answer: string;
}
