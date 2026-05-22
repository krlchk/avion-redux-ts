import type {
  ContactMessageRequest,
  ContactMessageResponse,
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse,
} from "../model/types";
import { baseApi } from "./baseApi";

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
