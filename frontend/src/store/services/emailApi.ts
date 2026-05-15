import { baseApi } from "./baseApi";

interface NewsletterSubscriptionRequest {
  email: string;
}

interface NewsletterSubscriptionResponse {
  message: string;
}

export const emailApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    subscribeNewsletter: build.mutation<
      NewsletterSubscriptionResponse,
      NewsletterSubscriptionRequest
    >({
      query: (body) => ({
        url: "/email/newsletter",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = emailApi;
