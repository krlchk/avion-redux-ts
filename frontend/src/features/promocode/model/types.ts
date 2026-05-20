import { ApiDecimal } from "@/shared/api/types";

type PromoCodeType = "PERCENT" | "FIXED";

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
