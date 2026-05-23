"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Order } from "@/features/order/model/types";
import { ArrowDown, Search } from "@/shared/icons";
import { useClientPagination } from "@/shared/model/pagination";
import { Loader, PaginationControls } from "@/shared/ui";
import {
  useCancelOrderMutation,
  useGetOrdersQuery,
} from "@/store/services/ordersApi";
import {
  formatProfileDate,
  formatProfileOrderPrice,
  formatProfileOrderStatus,
  getProfileActionErrorMessage,
} from "@/widgets/profile/model/profile.utils";
import type { ProfileOrderStatusFilter } from "@/widgets/profile/model/types";
import { ProfileConfirmModal } from "@/widgets/profile/ui/profile/ProfileConfirmModal";
import { ProfileOrdersFilter } from "@/widgets/profile/ui/orders/ProfileOrdersFilter";
import { ADMIN_ORDERS_PER_PAGE } from "../../model/constants";

const getStatusClassName = (status: Order["status"]) => {
  if (status === "PAID") return "text-green-700";
  if (status === "CANCELLED") return "text-[#FB5454]";

  return "text-[#947458]";
};

export const AdminOrdersPage = () => {
  const [selectedStatus, setSelectedStatus] =
    useState<ProfileOrderStatusFilter>("ALL");
  const ordersQuery =
    selectedStatus === "ALL" ? undefined : { status: selectedStatus };
  const { data, isError, isLoading } = useGetOrdersQuery(ordersQuery);
  const [cancelOrder, { isLoading: isCancelOrderLoading }] =
    useCancelOrderMutation();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [cancelMessage, setCancelMessage] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const orders = useMemo(() => data?.data ?? [], [data]);
  const filteredOrders = useMemo(() => {
    const normalizedCustomerSearch = customerSearch.trim().toLowerCase();

    if (!normalizedCustomerSearch) return orders;

    return orders.filter((order) => {
      const customerFields = [
        order.user?.name,
        order.user?.email,
        order.userId,
      ];
      const matchesCustomer =
        !normalizedCustomerSearch ||
        customerFields.some((field) =>
          field?.toLowerCase().includes(normalizedCustomerSearch),
        );

      return matchesCustomer;
    });
  }, [customerSearch, orders]);
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
    items: filteredOrders,
    itemsPerPage: ADMIN_ORDERS_PER_PAGE,
  });

  const handleStatusSelect = (status: ProfileOrderStatusFilter) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handleCancelOrder = async () => {
    if (!cancellingOrder) return;

    setCancelMessage("");

    try {
      await cancelOrder(cancellingOrder.id).unwrap();
      setCancellingOrder(null);
    } catch (error) {
      setCancelMessage(getProfileActionErrorMessage(error));
    }
  };

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-bold">Orders</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} orders.
          </p>
        </div>

        <ProfileOrdersFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={handleStatusSelect}
        />
      </div>

      <div className="mt-8">
        <label className="grid max-w-xl gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
            Customer search
          </span>
          <div className="relative">
            <input
              value={customerSearch}
              onChange={(event) => {
                setCustomerSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by customer name, email or id"
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
          Unable to load orders.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-220">
            <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr_0.7fr_0.8fr_0.7fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Order</p>
              <p>Customer</p>
              <p>Date</p>
              <p>Status</p>
              <p>Total</p>
              <p className="text-right">Actions</p>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No orders found.
              </div>
            ) : (
              paginatedItems.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                const orderDetailsId = `admin-order-details-${order.id}`;

                return (
                  <article key={order.id} className="border-b border-black/10">
                    <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr_0.7fr_0.8fr_0.7fr] items-center gap-4 py-5">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={orderDetailsId}
                        onClick={() =>
                          setExpandedOrderId(isExpanded ? null : order.id)
                        }
                        className="flex cursor-pointer items-center gap-3 text-left"
                      >
                        <ArrowDown
                          className={`shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : "-rotate-90"
                          }`}
                          stroke="#947458"
                        />
                        <div>
                          <p className="font-bold">#{order.id.slice(0, 8)}</p>
                          <p className="mt-1 text-sm font-medium text-black/40">
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </button>
                      <p className="text-sm font-medium text-black/60">
                        {order.user?.email ?? `#${order.userId?.slice(0, 8)}`}
                      </p>
                      <p className="text-sm font-medium text-black/60">
                        {formatProfileDate(order.createdAt)}
                      </p>
                      <p
                        className={`text-sm font-bold ${getStatusClassName(
                          order.status,
                        )}`}
                      >
                        {formatProfileOrderStatus(order.status)}
                      </p>
                      <p className="text-sm font-bold">
                        {formatProfileOrderPrice(order.totalPrice)}
                      </p>
                      <div className="flex justify-end gap-2">
                        {order.status === "PENDING" && (
                          <button
                            type="button"
                            onClick={() => {
                              setCancelMessage("");
                              setCancellingOrder(order);
                            }}
                            className="cursor-pointer border border-[#FB5454]/35 px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#FB5454] uppercase transition-colors hover:border-[#FB5454] hover:bg-[#FB5454]/5"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div id={orderDetailsId} className="pb-6 pl-9">
                        <div className="grid grid-cols-[1fr_0.6fr_0.6fr] gap-4 border-y border-black/10 py-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
                          <p>Product</p>
                          <p>Qty</p>
                          <p className="text-right">Line total</p>
                        </div>

                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-[1fr_0.6fr_0.6fr] items-center gap-4 border-b border-black/10 py-4 text-sm font-medium text-black/60"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#eeedec]">
                                {item.product?.img ? (
                                  <Image
                                    src={item.product.img}
                                    alt={item.product.title}
                                    fill
                                    unoptimized
                                    sizes="56px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-[#947458]/10" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-black">
                                  {item.product?.title ??
                                    `Product #${item.productId}`}
                                </p>
                              </div>
                            </div>
                            <p>{item.quantity}</p>
                            <p className="text-right font-bold text-black">
                              {formatProfileOrderPrice(
                                Number(item.price) * item.quantity,
                              )}
                            </p>
                          </div>
                        ))}

                        <div className="mt-5 grid justify-end gap-2 text-sm font-medium">
                          <div className="grid grid-cols-[180px_120px] gap-4">
                            <p className="text-black/45">Subtotal</p>
                            <p className="text-right font-bold">
                              {formatProfileOrderPrice(
                                order.subtotalPrice ?? order.totalPrice,
                              )}
                            </p>
                          </div>
                          <div className="grid grid-cols-[180px_120px] gap-4">
                            <p className="text-black/45">Promo discount</p>
                            <p className="text-right font-bold">
                              -{formatProfileOrderPrice(order.promoDiscountAmount)}
                            </p>
                          </div>
                          <div className="grid grid-cols-[180px_120px] gap-4 border-t border-black/10 pt-2 text-base">
                            <p className="font-bold">Total</p>
                            <p className="text-right font-bold">
                              {formatProfileOrderPrice(order.totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
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

      {cancellingOrder && (
        <ProfileConfirmModal
          title="Cancel order?"
          description={`This will cancel order #${cancellingOrder.id.slice(0, 8)} and return reserved items to stock.${cancelMessage ? ` ${cancelMessage}` : ""}`}
          confirmText="Cancel order"
          isLoading={isCancelOrderLoading}
          onCancel={() => {
            setCancelMessage("");
            setCancellingOrder(null);
          }}
          onConfirm={handleCancelOrder}
        />
      )}
    </div>
  );
};
