"use client";

import { Search } from "@/shared/icons";
import { Loader, PaginationControls } from "@/shared/ui";
import { useClientPagination } from "@/shared/model/pagination";
import {
  useDeleteProductMutation,
  useGetMyProductsQuery,
} from "@/store/services/productsApi";
import type { Product, SortVariant } from "@/features/product/model/types";
import { useMemo, useState } from "react";
import { ADMIN_PRODUCTS_PER_PAGE } from "../../model/constants";
import { AdminProductFormModal } from "./AdminProductFormModal";
import { SortDropdown } from "@/features/product/ui/catalog/SortDropdown";
import { sortQueryMap } from "@/features/product/model/catalog.constants";
import { ProfileConfirmModal } from "@/widgets/profile/ui/profile/ProfileConfirmModal";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";

export const AdminProductsPage = () => {
  const { data, isError, isLoading } = useGetMyProductsQuery();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortVariant>("latest");
  const [productSearch, setProductSearch] = useState("");
  const products = useMemo(() => data?.data ?? [], [data]);
  const filteredProducts = useMemo(() => {
    const normalizedSearch = productSearch.trim().toLowerCase();

    if (!normalizedSearch) return products;

    return products.filter((product) => {
      const productFields = [product.title, product.id];

      return productFields.some((field) =>
        field.toLowerCase().includes(normalizedSearch),
      );
    });
  }, [productSearch, products]);
  const sortedProducts = useMemo(() => {
    const selectedSortConfig = sortQueryMap[selectedSort];

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      const firstValue =
        selectedSortConfig.sortBy === "price"
          ? Number(firstProduct.price)
          : new Date(firstProduct.createdAt).getTime();
      const secondValue =
        selectedSortConfig.sortBy === "price"
          ? Number(secondProduct.price)
          : new Date(secondProduct.createdAt).getTime();

      if (selectedSortConfig.sortOrder === "asc") {
        return firstValue - secondValue;
      }

      return secondValue - firstValue;
    });
  }, [filteredProducts, selectedSort]);
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
    items: sortedProducts,
    itemsPerPage: ADMIN_PRODUCTS_PER_PAGE,
  });

  const handleSort = (sort: SortVariant) => {
    setSelectedSort(sort);
    setPage(1);
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    setDeleteMessage("");

    try {
      await deleteProduct(deletingProduct.id).unwrap();
      setDeletingProduct(null);
    } catch (error) {
      setDeleteMessage(getProfileActionErrorMessage(error));
    }
  };

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

        <div className="xs:flex-col flex items-center gap-3">
          <SortDropdown selectedSort={selectedSort} onSort={handleSort} />
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="xs:w-full cursor-pointer bg-[#947458] px-6 py-3 text-sm font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase transition-colors hover:bg-[#a9825f]"
          >
            New product
          </button>
        </div>
      </div>

      <div className="mt-8">
        <label className="grid max-w-xl gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
            Product search
          </span>
          <div className="relative">
            <input
              value={productSearch}
              onChange={(event) => {
                setProductSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by product name or id"
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

            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No products found.
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
                      onClick={() => setEditingProduct(product)}
                      className="cursor-pointer border border-black/15 px-3 py-2 text-xs font-bold tracking-[0.12em] text-black/55 uppercase transition-colors hover:border-[#947458] hover:text-[#947458]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteMessage("");
                        setDeletingProduct(product);
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

      {isCreateModalOpen && (
        <AdminProductFormModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {editingProduct && (
        <AdminProductFormModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <ProfileConfirmModal
          title="Delete product?"
          description={`This will permanently remove "${deletingProduct.title}" from the catalog.${deleteMessage ? ` ${deleteMessage}` : ""}`}
          confirmText="Delete"
          isLoading={isDeleteProductLoading}
          onCancel={() => {
            setDeleteMessage("");
            setDeletingProduct(null);
          }}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};
