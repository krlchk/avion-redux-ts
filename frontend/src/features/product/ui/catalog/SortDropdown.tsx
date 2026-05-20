import { ArrowDown } from "@/shared/icons";
import { useState, useRef, useEffect } from "react";
import { sortOptions } from "../../model/catalog.constants";
import { SortDropdownParams, SortVariant } from "../../model/types";

export const SortDropdown = ({ selectedSort, onSort }: SortDropdownParams) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedSortOption = sortOptions.find(
    (option) => option.value === selectedSort,
  );

  const handleSortSelect = (value: SortVariant) => {
    onSort(value);
    setIsSortOpen(false);
  };
  return (
    <div ref={sortDropdownRef} className="xs:w-full relative min-w-65 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isSortOpen}
        onClick={() => setIsSortOpen((previousValue) => !previousValue)}
        className="mobile:text-base xs:w-full flex w-full cursor-pointer items-center justify-between border border-[#947458] bg-[#f5f5f5] px-4 py-2 text-xl font-medium text-black/70 transition-colors hover:border-[#7f6249]"
      >
        <span className="truncate">
          {selectedSortOption?.title ?? "Sort by latest"}
        </span>
        <ArrowDown
          className={`shrink-0 transition-transform duration-200 ${
            isSortOpen ? "rotate-180" : ""
          }`}
          stroke="#947458"
        />
      </button>

      {isSortOpen && (
        <div className="absolute top-full right-0 z-20 mt-2 w-full overflow-hidden border border-[#947458] bg-[#f5f5f5] p-2">
          <ul role="listbox" className="flex flex-col gap-1">
            {sortOptions.map(({ value, title }) => {
              const isSelected = value === selectedSort;

              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => handleSortSelect(value as SortVariant)}
                    className={`mobile:text-base flex w-full items-center rounded-xl px-4 py-3 text-left text-xl font-medium transition-colors ${
                      isSelected
                        ? "bg-[#947458] text-[#f5f5f5]"
                        : "text-black/70 hover:bg-[#eeedec]"
                    }`}
                  >
                    {title}
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