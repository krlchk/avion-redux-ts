"use client";

import { useMemo, useState } from "react";
import type {
  Category,
  CategoryDetails,
} from "@/features/category/model/types";
import { Search } from "@/shared/icons";
import { useClientPagination } from "@/shared/model/pagination";
import { Loader, PaginationControls } from "@/shared/ui";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/store/services/categoriesApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";
import { ProfileConfirmModal } from "@/widgets/profile/ui/profile/ProfileConfirmModal";
import { ADMIN_CATEGORIES_PER_PAGE } from "../../model/constants";
import { AdminCategoryFormModal } from "./AdminCategoryFormModal";

export const AdminCategoriesPage = () => {
  const { data, isError, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleteCategoryLoading }] =
    useDeleteCategoryMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryDetails | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [deleteMessage, setDeleteMessage] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const categories = useMemo(() => data?.data ?? [], [data]);
  const filteredCategories = useMemo(() => {
    const normalizedSearch = categorySearch.trim().toLowerCase();

    if (!normalizedSearch) return categories;

    return categories.filter((category) => {
      const categoryFields = [category.name, category.id];

      return categoryFields.some((field) =>
        field.toLowerCase().includes(normalizedSearch),
      );
    });
  }, [categories, categorySearch]);
  const sortedCategories = useMemo(() => {
    return [...filteredCategories].sort((firstCategory, secondCategory) =>
      firstCategory.name.localeCompare(secondCategory.name),
    );
  }, [filteredCategories]);
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
    items: sortedCategories,
    itemsPerPage: ADMIN_CATEGORIES_PER_PAGE,
  });

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;

    setDeleteMessage("");

    try {
      await deleteCategory(deletingCategory.id).unwrap();
      setDeletingCategory(null);
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
          <h1 className="mt-4 text-4xl font-bold">Categories</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} categories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="cursor-pointer bg-[#947458] px-6 py-3 text-sm font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase transition-colors hover:bg-[#a9825f]"
        >
          New category
        </button>
      </div>

      <div className="mt-8">
        <label className="grid max-w-xl gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
            Category search
          </span>
          <div className="relative">
            <input
              value={categorySearch}
              onChange={(event) => {
                setCategorySearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by category name or id"
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
          Unable to load categories.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-150">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Category</p>
              <p>Products</p>
              <p className="text-right">Actions</p>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No categories found.
              </div>
            ) : (
              paginatedItems.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center gap-4 border-b border-black/10 py-5"
                >
                  <div>
                    <p className="font-bold">{category.name}</p>
                    <p className="mt-1 text-sm font-medium text-black/40">
                      #{category.id.slice(0, 8)}
                    </p>
                  </div>
                  <p className="text-sm font-bold">{category.productsCount}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingCategory({
                          id: category.id,
                          name: category.name,
                        })
                      }
                      className="cursor-pointer border border-black/15 px-3 py-2 text-xs font-bold tracking-[0.12em] text-black/55 uppercase transition-colors hover:border-[#947458] hover:text-[#947458]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteMessage("");
                        setDeletingCategory(category);
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
        <AdminCategoryFormModal
          onClose={() => {
            setIsCreateModalOpen(false);
            setPage(1);
          }}
        />
      )}

      {editingCategory && (
        <AdminCategoryFormModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {deletingCategory && (
        <ProfileConfirmModal
          title="Delete category?"
          description={`This will permanently remove "${deletingCategory.name}" from the catalog.${deleteMessage ? ` ${deleteMessage}` : ""}`}
          confirmText="Delete"
          isLoading={isDeleteCategoryLoading}
          onCancel={() => {
            setDeleteMessage("");
            setDeletingCategory(null);
          }}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
};
