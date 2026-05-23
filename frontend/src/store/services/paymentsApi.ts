import type {
  ConfirmOrderPaymentRequest,
  ConfirmOrderPaymentResponse,
  CreatePaymentIntentResponse,
} from "../model/types";
import { baseApi } from "./baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<CreatePaymentIntentResponse, string>({
      query: (orderId) => ({
        url: `/payments/intents/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["Orders", "Payments"],
    }),
    confirmOrderPayment: build.mutation<
      ConfirmOrderPaymentResponse,
      ConfirmOrderPaymentRequest
    >({
      query: (body) => ({
        url: "/payments/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Payments", "Products"],
    }),
  }),
});

export const {
  useConfirmOrderPaymentMutation,
  useCreatePaymentIntentMutation,
} = paymentsApi;
