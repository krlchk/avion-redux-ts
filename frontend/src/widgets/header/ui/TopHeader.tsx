"use client";

import { ArrowDown, Search, Phone } from "@/shared/icons";
import { Container, Loader } from "@/shared/ui";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const TopHeader = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const router = useRouter();

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-8">
        <Loader />
      </Container>
    );
  }

  if (isError)
    return (
      <Container className="py-5 text-center text-sm text-[#FB5454]">
        Failed to load categories
      </Container>
    );

  if (!data) return null;
  const categories = data.data;
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map(({ id, name }) => ({ value: id, label: name })),
  ];

  if (categories.length === 0) {
    return (
      <Container className="py-8 text-center text-sm text-black/60">
        No categories available
      </Container>
    );
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteInput = () => {
    setSearchTerm("");
    setSelectedCategoryId("");
    router.push("/products");
  };

  const handleFind = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (selectedCategoryId) {
      params.set("categoryId", selectedCategoryId);
    }

    const queryString = params.toString();

    router.push(queryString ? `/products?${queryString}` : "/products");
  };

  return (
    <div className="bg-[#F6F4F2]">
      <Container className="mobile:flex-col mobile:items-stretch tablet:flex-col tablet:items-stretch xs:text-xs flex items-center justify-between gap-4 py-5 text-sm font-medium text-black">
        <p className="mobile:text-center tablet:text-center">
          60 Fremont Ave. Hamden, CT 06514
        </p>
        <div className="mobile:order-3 mobile:max-w-none tablet:order-3 tablet:max-w-none xs:px-4 flex h-10.5 w-full max-w-130 items-center border border-[#D8DEE3] bg-white px-6">
          <CategoryDropdown
            selectedCategoryId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            options={categoryOptions}
          />
          <span className="h-8 w-px bg-[#D8DEE3]" />
          <input
            value={searchTerm}
            className="xs:px-4 xs:text-xs min-w-0 flex-1 bg-transparent px-6 text-sm font-medium text-black outline-none placeholder:text-[#ADB5BD]"
            type="text"
            placeholder="Search product..."
            onChange={handleSearchInput}
          />
          {(searchTerm || selectedCategoryId !== "") && (
            <button
              onClick={handleDeleteInput}
              className="shrink-0 cursor-pointer text-black"
              type="button"
              aria-label="Clear"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleFind}
            className="ml-4 shrink-0 cursor-pointer text-black"
            type="button"
            aria-label="Search"
          >
            <Search />
          </button>
        </div>
        <div className="mobile:text-center tablet:text-center flex items-center justify-center gap-3">
          <Phone />
          <p>(097) - 962 - 37 - 22</p>
        </div>
      </Container>
    </div>
  );
};

interface CategoryDropdownProps {
  selectedCategoryId: string;
  onSelect: (value: string) => void;
  options: { value: string; label: string }[];
}

const CategoryDropdown = ({
  selectedCategoryId,
  onSelect,
  options,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === selectedCategoryId,
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="xs:pr-6 relative min-w-47 shrink-0 pr-9">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previousValue) => !previousValue)}
        className="xs:max-w-29.5 xs:pr-6 xs:text-xs flex w-full cursor-pointer items-center justify-between bg-transparent pr-8 text-left text-sm font-medium text-black outline-none"
      >
        <span className="truncate">
          {selectedOption?.label ?? "All Categories"}
        </span>
        <ArrowDown
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-2 min-w-full overflow-hidden border border-[#D8DEE3] bg-white p-2 shadow-sm">
          <ul role="listbox" className="flex flex-col gap-1">
            {options.map(({ value, label }) => {
              const isSelected = value === selectedCategoryId;

              return (
                <li key={value || "all-categories"}>
                  <button
                    type="button"
                    onClick={() => handleSelect(value)}
                    className={`xs:text-xs flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-[#947458] text-white"
                        : "text-black/70 hover:bg-[#F6F4F2]"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
