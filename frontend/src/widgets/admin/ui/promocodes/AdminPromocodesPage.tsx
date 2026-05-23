"use client";

import { useMemo, useState } from "react";
import type { PromoCode } from "@/features/promocode/model/types";
import { Search } from "@/shared/icons";
import { useClientPagination } from "@/shared/model/pagination";
import { Loader, PaginationControls } from "@/shared/ui";
import {
  useGetPromocodesQuery,
  useToggleActivatePromoCodeMutation,
} from "@/store/services/promocodesApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";
import { ProfileConfirmModal } from "@/widgets/profile/ui/profile/ProfileConfirmModal";
import { ADMIN_PROMOCODES_PER_PAGE } from "../../model/constants";
import { AdminPromocodeFormModal } from "./AdminPromocodeFormModal";

const formatPromocodeValue = (promocode: PromoCode) => {
  const value = Number(promocode.value);

  if (promocode.type === "PERCENT") {
    return `${value}%`;
  }

  return `$${value}`;
};

const formatDate = (value: string | null) => {
  if (!value) return "No expiry";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const AdminPromocodesPage = () => {
  const { data, isError, isLoading } = useGetPromocodesQuery();
  const [toggleActivatePromoCode, { isLoading: isTogglePromoCodeLoading }] =
    useToggleActivatePromoCodeMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [togglingPromocode, setTogglingPromocode] = useState<PromoCode | null>(
    null,
  );
  const [toggleMessage, setToggleMessage] = useState("");
  const [promocodeSearch, setPromocodeSearch] = useState("");
  const promocodes = useMemo(() => data?.data ?? [], [data]);
  const filteredPromocodes = useMemo(() => {
    const normalizedSearch = promocodeSearch.trim().toLowerCase();

    if (!normalizedSearch) return promocodes;

    return promocodes.filter((promocode) => {
      const promocodeFields = [
        promocode.code,
        promocode.title ?? "",
        promocode.id,
      ];

      return promocodeFields.some((field) =>
        field.toLowerCase().includes(normalizedSearch),
      );
    });
  }, [promocodeSearch, promocodes]);
  const {
    page,
    setPage,
    lastPage,
    startItem,
    endItem,
    totalItems,
    paginatedItems,
    onPrevPage,
    onNextPage,
  } = useClientPagination({
    items: filteredPromocodes,
    itemsPerPage: ADMIN_PROMOCODES_PER_PAGE,
  });

  const handleTogglePromocode = async () => {
    if (!togglingPromocode) return;

    setToggleMessage("");

    try {
      await toggleActivatePromoCode({
        code: togglingPromocode.code,
        isActive: !togglingPromocode.isActive,
      }).unwrap();
      setTogglingPromocode(null);
    } catch (error) {
      setToggleMessage(getProfileActionErrorMessage(error));
    }
  };

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-bold">Promocodes</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} promocodes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="cursor-pointer bg-[#947458] px-6 py-3 text-sm font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase transition-colors hover:bg-[#a9825f]"
        >
          New promocode
        </button>
      </div>

      <div className="mt-8">
        <label className="grid max-w-xl gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
            Promocode search
          </span>
          <div className="relative">
            <input
              value={promocodeSearch}
              onChange={(event) => {
                setPromocodeSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by promocode, title or id"
              className="w-full border border-[#947458] bg-white py-3 pr-12 pl-4 text-base font-medium outline-none transition-colors focus:border-[#947458]"
            />
            <Search
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              stroke="#947458"
            />
          </div>
        </label>
      </div>

      {isLoading && (
        <div className="flex min-h-80 items-center justify-center">
          <Loader />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 border border-[#FB5454]/20 bg-[#FB5454]/5 p-6 text-center text-sm font-medium text-[#FB5454]">
          Unable to load promocodes.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-220">
            <div className="grid grid-cols-[1.1fr_1fr_0.7fr_0.7fr_0.8fr_0.7fr_0.8fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Code</p>
              <p>Title</p>
              <p>Type</p>
              <p>Value</p>
              <p>Uses</p>
              <p>Status</p>
              <p className="text-right">Actions</p>
            </div>

            {filteredPromocodes.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No promocodes found.
              </div>
            ) : (
              paginatedItems.map((promocode) => (
                <div
                  key={promocode.id}
                  className="grid grid-cols-[1.1fr_1fr_0.7fr_0.7fr_0.8fr_0.7fr_0.8fr] items-center gap-4 border-b border-black/10 py-5"
                >
                  <div>
                    <p className="font-bold">{promocode.code}</p>
                    <p className="mt-1 text-sm font-medium text-black/40">
                      {formatDate(promocode.expiresAt)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-black/60">
                    {promocode.title ?? "-"}
                  </p>
                  <p className="text-sm font-bold">{promocode.type}</p>
                  <p className="text-sm font-bold">
                    {formatPromocodeValue(promocode)}
                  </p>
                  <p className="text-sm font-medium text-black/60">
                    {promocode.usedCount}
                    {promocode.maxUses ? `/${promocode.maxUses}` : ""}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      promocode.isActive ? "text-[#4D7C50]" : "text-black/35"
                    }`}
                  >
                    {promocode.isActive ? "Active" : "Inactive"}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setToggleMessage("");
                        setTogglingPromocode(promocode);
                      }}
                      className={`cursor-pointer ${!promocode.isActive && "border-green-700/35 text-green-700 hover:border-green-700 hover:text-green-700"} border border-[#FB5454]/35 px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#FB5454] uppercase transition-colors hover:border-[#FB5454]`}
                    >
                      {promocode.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <PaginationControls
            page={page}
            lastPage={lastPage}
            onPageChange={setPage}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </div>
      )}

      {isCreateModalOpen && (
        <AdminPromocodeFormModal
          onClose={() => {
            setIsCreateModalOpen(false);
            setPage(1);
          }}
        />
      )}

      {togglingPromocode && (
        <ProfileConfirmModal
          title={`${togglingPromocode.isActive ? "Deactivate" : "Activate"} promocode?`}
          description={`This will ${togglingPromocode.isActive ? "disable" : "enable"} "${togglingPromocode.code}" for checkout.${toggleMessage ? ` ${toggleMessage}` : ""}`}
          confirmText={togglingPromocode.isActive ? "Deactivate" : "Activate"}
          isLoading={isTogglePromoCodeLoading}
          onCancel={() => {
            setToggleMessage("");
            setTogglingPromocode(null);
          }}
          onConfirm={handleTogglePromocode}
        />
      )}
    </div>
  );
};
