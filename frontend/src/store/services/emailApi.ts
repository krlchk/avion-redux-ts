import { baseApi } from "./baseApi";

interface NewsletterSubscriptionRequest {
  email: string;
}

interface NewsletterSubscriptionResponse {
  message: string;
}

interface ContactMessageRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactMessageResponse {
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
    sendContactMessage: build.mutation<
      ContactMessageResponse,
      ContactMessageRequest
    >({
      query: (body) => ({
        url: "/email/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeNewsletterMutation, useSendContactMessageMutation } =
  emailApi;
