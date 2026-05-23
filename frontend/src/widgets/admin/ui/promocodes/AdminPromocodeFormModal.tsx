"use client";

import { ComponentProps, useState } from "react";
import type {
  PromoCodeFormPayload,
  PromoCodeType,
} from "@/features/promocode/model/types";
import { Loader } from "@/shared/ui";
import { useCreatePromoCodeMutation } from "@/store/services/promocodesApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";

interface AdminPromocodeFormModalProps {
  onClose: () => void;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export const AdminPromocodeFormModal = ({
  onClose,
}: AdminPromocodeFormModalProps) => {
  const [createPromoCode, { isLoading }] = useCreatePromoCodeMutation();
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    code: "",
    title: "",
    type: "PERCENT" as PromoCodeType,
    value: "",
    expiresAt: "",
    maxUses: "",
  });

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload: PromoCodeFormPayload = {
      code: formValues.code.trim(),
      title: formValues.title.trim() || undefined,
      type: formValues.type,
      value: Number(formValues.value),
      expiresAt: formValues.expiresAt || undefined,
      maxUses: formValues.maxUses ? Number(formValues.maxUses) : undefined,
    };

    try {
      await createPromoCode(payload).unwrap();
      onClose();
    } catch (error) {
      setMessage(getProfileActionErrorMessage(error));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-promocode-form-title"
    >
      <div className="mobile:p-6 w-full max-w-2xl border border-[#f5f5f5]/35 bg-[#f5f5f5] p-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
        <p
          id="admin-promocode-form-title"
          className="text-3xl leading-10 font-bold"
        >
          New promocode
        </p>
        <p className="mt-3 text-base leading-7 font-medium text-black/50">
          Add a promocode customers can apply during checkout.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Code
              </span>
              <input
                required
                value={formValues.code}
                onChange={(event) => updateField("code", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Title
              </span>
              <input
                value={formValues.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
              />
            </label>
          </div>

          <div className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
              Type
            </span>
            <div className="grid grid-cols-2 border border-[#947458] bg-[#f5f5f5] p-1">
              {(["PERCENT", "FIXED"] as const).map((type) => {
                const isSelected = formValues.type === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField("type", type)}
                    className={`cursor-pointer px-4 py-3 text-sm font-bold tracking-[0.12em] uppercase transition-colors ${
                      isSelected
                        ? "bg-[#947458] text-[#f5f5f5]"
                        : "text-black/60 hover:bg-[#eeedec]"
                    }`}
                  >
                    {type === "PERCENT" ? "Percent" : "Fixed"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mobile:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Value
              </span>
              <input
                required
                min={1}
                step="0.01"
                type="number"
                value={formValues.value}
                onChange={(event) => updateField("value", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Expires at
              </span>
              <input
                type="date"
                value={formValues.expiresAt}
                onChange={(event) =>
                  updateField("expiresAt", event.target.value)
                }
                className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Max uses
              </span>
              <input
                min={1}
                step={1}
                type="number"
                value={formValues.maxUses}
                onChange={(event) => updateField("maxUses", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
              />
            </label>
          </div>

          {message && (
            <p className="text-sm font-medium text-[#FB5454]">{message}</p>
          )}

          <div className="mt-2 flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-w-36 cursor-pointer items-center justify-center bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:bg-[#a9825f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
