import { Loader } from "@/shared/ui";
import { useGetMyOrdersQuery } from "@/store/services/ordersApi";
import { useState } from "react";
import { ProfileOrderRow } from "./ProfileOrderRow";
import type { ProfileOrderStatusFilter } from "../../model/types";
import { ProfileOrdersFilter } from "./ProfileOrdersFilter";

export const ProfileOrders = () => {
  const [selectedStatus, setSelectedStatus] =
    useState<ProfileOrderStatusFilter>("ALL");

  const ordersQuery =
    selectedStatus === "ALL" ? undefined : { status: selectedStatus };

  const { data, isError, isLoading } = useGetMyOrdersQuery(ordersQuery);
  const orders = data?.data ?? [];

  return (
    <>
      <div className="pt-10">
        <h2 className="text-lg font-bold tracking-[0.18em] text-[#f5f5f5]/75 uppercase">
          Recent orders
        </h2>
        <p className="mt-7 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/82">
          A clean overview of your latest Avion purchases.
        </p>
      </div>

      <div className="mobile:p-6 mb-10 border border-[#f5f5f5]/25 bg-[#f5f5f5] p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mobile:flex-col mobile:items-start flex items-end justify-between gap-6">
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            {orders.length} orders
          </p>
          <ProfileOrdersFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </div>

        <div className="mt-9">
          <div className="tablet:hidden mobile:hidden grid grid-cols-[1.2fr_0.9fr_0.8fr_0.8fr] border-b border-black/10 pb-5 text-xs font-medium tracking-[0.22em] text-black/35 uppercase">
            <p>Order</p>
            <p>Date</p>
            <p>Status</p>
            <p className="text-right">Total</p>
          </div>

          {isLoading && (
            <div className="flex min-h-36 items-center justify-center">
              <Loader styles="h-8 w-8 border-4 border-[#947458]/20 border-t-[#947458]" />
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex min-h-36 items-center justify-center border-b border-black/10 text-center text-base font-medium text-[#FB5454]">
              Unable to load orders. Please try again later.
            </div>
          )}

          {!isLoading && !isError && orders.length === 0 && (
            <div className="flex min-h-36 items-center justify-center border-b border-black/10 text-center text-base font-medium text-black/45">
              You do not have orders yet.
            </div>
          )}

          {!isLoading &&
            !isError &&
            orders.map((order) => (
              <ProfileOrderRow key={order.id} order={order} />
            ))}
        </div>
      </div>
    </>
  );
};
