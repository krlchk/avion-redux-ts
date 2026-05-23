import { ArrowDown } from "@/shared/icons";
import { useState, useRef, useEffect } from "react";
import { orderStatusFilterOptions } from "../../model/profile.utils";
import { ProfileOrdersFilterProps, ProfileOrderStatusFilter } from "../../model/types";

export const ProfileOrdersFilter = ({
  selectedStatus,
  setSelectedStatus,
}: ProfileOrdersFilterProps) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedStatusOption = orderStatusFilterOptions.find(
    (option) => option.value === selectedStatus,
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleStatusSelect = (value: ProfileOrderStatusFilter) => {
    setSelectedStatus(value);
    setIsStatusOpen(false);
  };
  return (
    <div
      ref={statusDropdownRef}
      className="xs:w-full relative min-w-65 shrink-0"
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isStatusOpen}
        onClick={() => setIsStatusOpen((previousValue) => !previousValue)}
        className="mobile:text-base xs:w-full flex w-full cursor-pointer items-center justify-between border border-[#947458] bg-[#f5f5f5] px-4 py-2 text-xl font-medium text-black/70 transition-colors hover:border-[#7f6249]"
      >
        <span className="truncate">
          {selectedStatusOption?.title ?? "All statuses"}
        </span>
        <ArrowDown
          className={`shrink-0 transition-transform duration-200 ${
            isStatusOpen ? "rotate-180" : ""
          }`}
          stroke="#947458"
        />
      </button>

      {isStatusOpen && (
        <div className="absolute top-full right-0 z-20 mt-2 w-full overflow-hidden border border-[#947458] bg-[#f5f5f5] p-2">
          <ul role="listbox" className="flex flex-col gap-1">
            {orderStatusFilterOptions.map(({ value, title }) => {
              const isSelected = value === selectedStatus;

              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => handleStatusSelect(value)}
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
