import type {
  PromoCode,
  PromoCodeFormPayload,
  PromoCodeResponse,
  ToggleActivatePromoCodeRequest,
  ValidatePromoCodeRequest,
  ValidatePromoCodeResponse,
} from "@/features/promocode/model/types";
import { baseApi } from "./baseApi";

export const promocodesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromocodes: build.query<PromoCodeResponse, void>({
      query: () => "/promocodes",
      providesTags: ["Promocodes"],
    }),

    validatePromoCode: build.query<
      ValidatePromoCodeResponse,
      ValidatePromoCodeRequest
    >({
      query: (params) => ({
        url: "/promocodes/validate",
        params,
      }),
      providesTags: ["Promocodes"],
    }),

    createPromoCode: build.mutation<PromoCode, PromoCodeFormPayload>({
      query: (body) => ({
        url: "/promocodes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promocodes"],
    }),

    toggleActivatePromoCode: build.mutation<
      PromoCode,
      ToggleActivatePromoCodeRequest
    >({
      query: (body) => ({
        url: "/promocodes/activate",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Promocodes"],
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useGetPromocodesQuery,
  useLazyValidatePromoCodeQuery,
  useToggleActivatePromoCodeMutation,
  useValidatePromoCodeQuery,
} = promocodesApi;
