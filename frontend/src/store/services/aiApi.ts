import type {
  ProductAssistantRequest,
  ProductAssistantResponse,
} from "@/features/ai/model/types";
import { baseApi } from "./baseApi";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    askProductAssistant: build.mutation<
      ProductAssistantResponse,
      ProductAssistantRequest
    >({
      query: (body) => ({
        url: "/ai/product-assistant",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ai"],
    }),
  }),
});

export const { useAskProductAssistantMutation } = aiApi;
