import { ApiDecimal } from "@/shared/api/types";

export type PromoCodeType = "PERCENT" | "FIXED";

export interface PromoCode {
  id: string;
  code: string;
  title: string | null;
  type: PromoCodeType;
  value: ApiDecimal;
  isActive: boolean;
  expiresAt: string | null;
  maxUses: number | null;
  usedCount: number;
  createdAt: string;
}

export interface PromoCodeResponse {
  data: PromoCode[];
}

export interface PromoCodeFormPayload {
  code: string;
  title?: string;
  type: PromoCodeType;
  value: number;
  expiresAt?: string;
  maxUses?: number;
}

export interface ToggleActivatePromoCodeRequest {
  code: string;
  isActive: boolean;
}

export interface ValidatePromoCodeRequest {
  code: string;
}

export interface ValidatePromoCodeResponse {
  code: string;
  title: string | null;
  type: PromoCodeType;
  value: ApiDecimal;
  expiresAt: string | null;
}
