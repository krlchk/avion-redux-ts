"use client";

import { Loader, PaginationControls } from "@/shared/ui";
import { useClientPagination } from "@/shared/model/pagination";
import { useGetMyProductsQuery } from "@/store/services/productsApi";
import { useMemo } from "react";

const ADMIN_PRODUCTS_PER_PAGE = 9;

export const AdminProductsPage = () => {
  const { data, isError, isLoading } = useGetMyProductsQuery();
  const products = useMemo(() => data?.data ?? [], [data]);
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
    items: products,
    itemsPerPage: ADMIN_PRODUCTS_PER_PAGE,
  });

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            Catalog
          </p>
          <h1 className="mt-4 text-4xl font-bold">Products</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} products.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer bg-[#947458] px-6 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#a9825f]"
        >
          New product
        </button>
      </div>

      {isLoading && (
        <div className="flex min-h-80 items-center justify-center">
          <Loader />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 border border-[#FB5454]/20 bg-[#FB5454]/5 p-6 text-center text-sm font-medium text-[#FB5454]">
          Unable to load products.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-180">
            <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_0.7fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Product</p>
              <p>Category</p>
              <p>Price</p>
              <p>Stock</p>
              <p className="text-right">Actions</p>
            </div>

            {products.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No products yet.
              </div>
            ) : (
              paginatedItems.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_0.7fr] items-center gap-4 border-b border-black/10 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-16 w-16 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.img})` }}
                    />
                    <div>
                      <p className="font-bold">{product.title}</p>
                      <p className="mt-1 text-sm font-medium text-black/40">
                        #{product.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-black/60">
                    {product.categoryId.slice(0, 8)}
                  </p>
                  <p className="text-sm font-bold">${product.finalPrice}</p>
                  <p className="text-sm font-bold">{product.stock}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="cursor-pointer border border-black/15 px-3 py-2 text-xs font-bold tracking-[0.12em] text-black/55 uppercase transition-colors hover:border-[#947458] hover:text-[#947458]"
                    >
                      Edit
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
    </div>
  );
};
