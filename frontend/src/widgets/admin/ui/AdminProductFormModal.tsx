"use client";

import { ArrowDown } from "@/shared/icons";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Loader } from "@/shared/ui";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/store/services/productsApi";
import type { Product, ProductFormPayload } from "@/features/product/model/types";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";

interface AdminProductFormModalProps {
  onClose: () => void;
  product?: Product;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export const AdminProductFormModal = ({
  onClose,
  product,
}: AdminProductFormModalProps) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();
  const isEditMode = Boolean(product);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    title: product?.title ?? "",
    description: product?.description ?? "",
    img: product?.img ?? "",
    price: product ? String(product.price) : "",
    stock: product ? String(product.stock) : "",
    width: product?.width ? String(product.width) : "",
    height: product?.height ? String(product.height) : "",
    depth: product?.depth ? String(product.depth) : "",
    categoryId: product?.categoryId ?? "",
  });
  const [image, setImage] = useState<File | undefined>();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const categories = categoriesData?.data ?? [];
  const isLoading =
    isCategoriesLoading || isCreateProductLoading || isUpdateProductLoading;
  const selectedCategory = categories.find(
    (category) => category.id === formValues.categoryId,
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  const toOptionalNumber = (value: string) => {
    return value.trim() ? Number(value) : undefined;
  };

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload: ProductFormPayload = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      img: formValues.img.trim() || undefined,
      image,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      width: toOptionalNumber(formValues.width),
      height: toOptionalNumber(formValues.height),
      depth: toOptionalNumber(formValues.depth),
      categoryId: formValues.categoryId,
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, data: payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      onClose();
    } catch (error) {
      setMessage(getProfileActionErrorMessage(error));
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    updateField("categoryId", categoryId);
    setIsCategoryOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-product-form-title"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[#f5f5f5]/35 bg-[#f5f5f5] p-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
        <p
          id="admin-product-form-title"
          className="text-3xl leading-10 font-bold"
        >
          {isEditMode ? "Edit product" : "New product"}
        </p>
        <p className="mt-3 text-base leading-7 font-medium text-black/50">
          {isEditMode
            ? "Update product details in the storefront catalog."
            : "Add a product to the storefront catalog."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
              Title
            </span>
            <input
              required
              value={formValues.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
              Description
            </span>
            <textarea
              value={formValues.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className="min-h-28 border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
            />
          </label>

          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Image file
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setImage(event.target.files?.[0])}
                className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none file:mr-4 file:cursor-pointer file:border-0 file:bg-[#947458] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Image URL
              </span>
              <input
                value={formValues.img}
                onChange={(event) => updateField("img", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Price
              </span>
              <input
                required
                min={0}
                step="0.01"
                type="number"
                value={formValues.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                Stock
              </span>
              <input
                required
                min={0}
                step={1}
                type="number"
                value={formValues.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-5 mobile:grid-cols-1">
            {(["width", "height", "depth"] as const).map((field) => (
              <label key={field} className="grid gap-2">
                <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
                  {field}
                </span>
                <input
                  min={0}
                  step="0.01"
                  type="number"
                  value={formValues[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
                />
              </label>
            ))}
          </div>

          <div className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
              Category
            </span>
            <input
              required
              tabIndex={-1}
              value={formValues.categoryId}
              onChange={() => undefined}
              className="sr-only"
            />
            <div
              ref={categoryDropdownRef}
              className="xs:w-full relative min-w-65 shrink-0"
            >
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
                disabled={isCategoriesLoading}
                onClick={() =>
                  setIsCategoryOpen((previousValue) => !previousValue)
                }
                className="mobile:text-base xs:w-full flex w-full cursor-pointer items-center justify-between border border-[#947458] bg-[#f5f5f5] px-4 py-2 text-xl font-medium text-black/70 transition-colors hover:border-[#7f6249] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="truncate">
                  {selectedCategory?.name ?? "Select category"}
                </span>
                <ArrowDown
                  className={`shrink-0 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  stroke="#947458"
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full right-0 z-20 mt-2 max-h-72 w-full overflow-y-auto border border-[#947458] bg-[#f5f5f5] p-2">
                  <ul role="listbox" className="flex flex-col gap-1">
                    {categories.map((category) => {
                      const isSelected = category.id === formValues.categoryId;

                      return (
                        <li key={category.id}>
                          <button
                            type="button"
                            onClick={() => handleCategorySelect(category.id)}
                            className={`mobile:text-base flex w-full items-center rounded-xl px-4 py-3 text-left text-xl font-medium transition-colors ${
                              isSelected
                                ? "bg-[#947458] text-[#f5f5f5]"
                                : "text-black/70 hover:bg-[#eeedec]"
                            }`}
                          >
                            {category.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
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
              {isCreateProductLoading || isUpdateProductLoading ? (
                <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
              ) : (
                <>{isEditMode ? "Save" : "Create"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
