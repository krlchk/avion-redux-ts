"use client";

import { useMemo, useState } from "react";
import type { Review } from "@/features/review/model/types";
import { useClientPagination } from "@/shared/model/pagination";
import { Loader, PaginationControls } from "@/shared/ui";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/store/services/reviewsApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";
import { ProfileConfirmModal } from "@/widgets/profile/ui/profile/ProfileConfirmModal";
import { ADMIN_REVIEWS_PER_PAGE } from "../../model/constants";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const AdminReviewsPage = () => {
  const { data, isError, isLoading } = useGetReviewsQuery();
  const [deleteReview, { isLoading: isDeleteReviewLoading }] =
    useDeleteReviewMutation();
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const reviews = useMemo(() => data?.data ?? [], [data]);
  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (firstReview, secondReview) =>
        new Date(secondReview.createdAt).getTime() -
        new Date(firstReview.createdAt).getTime(),
    );
  }, [reviews]);
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
    items: sortedReviews,
    itemsPerPage: ADMIN_REVIEWS_PER_PAGE,
  });

  const handleDeleteReview = async () => {
    if (!deletingReview) return;

    setDeleteMessage("");

    try {
      await deleteReview(deletingReview.id).unwrap();
      setDeletingReview(null);
    } catch (error) {
      setDeleteMessage(getProfileActionErrorMessage(error));
    }
  };

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            Community
          </p>
          <h1 className="mt-4 text-4xl font-bold">Reviews</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} reviews.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex min-h-80 items-center justify-center">
          <Loader />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 border border-[#FB5454]/20 bg-[#FB5454]/5 p-6 text-center text-sm font-medium text-[#FB5454]">
          Unable to load reviews.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-220">
            <div className="grid grid-cols-[0.6fr_1.4fr_0.9fr_0.9fr_0.8fr_0.7fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Rating</p>
              <p>Comment</p>
              <p>Product</p>
              <p>User</p>
              <p>Date</p>
              <p className="text-right">Actions</p>
            </div>

            {reviews.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No reviews yet.
              </div>
            ) : (
              paginatedItems.map((review) => (
                <div
                  key={review.id}
                  className="grid grid-cols-[0.6fr_1.4fr_0.9fr_0.9fr_0.8fr_0.7fr] items-center gap-4 border-b border-black/10 py-5"
                >
                  <p className="text-sm font-bold">{review.rating}/5</p>
                  <div>
                    <p className="line-clamp-2 text-sm font-medium text-black/70">
                      {review.comment ?? "No comment provided."}
                    </p>
                    <p className="mt-1 text-sm font-medium text-black/40">
                      #{review.id.slice(0, 8)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-black/60">
                    #{review.productId.slice(0, 8)}
                  </p>
                  <p className="text-sm font-medium text-black/60">
                    {review.user?.name ?? `#${review.userId.slice(0, 8)}`}
                  </p>
                  <p className="text-sm font-medium text-black/60">
                    {formatDate(review.createdAt)}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteMessage("");
                        setDeletingReview(review);
                      }}
                      className="cursor-pointer border border-[#FB5454]/35 px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#FB5454] uppercase transition-colors hover:border-[#FB5454] hover:bg-[#FB5454]/5"
                    >
                      Delete
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

      {deletingReview && (
        <ProfileConfirmModal
          title="Delete review?"
          description={`This will permanently remove the selected review from the catalog.${deleteMessage ? ` ${deleteMessage}` : ""}`}
          confirmText="Delete"
          isLoading={isDeleteReviewLoading}
          onCancel={() => {
            setDeleteMessage("");
            setDeletingReview(null);
          }}
          onConfirm={handleDeleteReview}
        />
      )}
    </div>
  );
};
