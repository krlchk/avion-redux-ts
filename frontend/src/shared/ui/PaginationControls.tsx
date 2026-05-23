import { ArrowLeft, ArrowRight } from "@/shared/icons";
import { getPaginationItems } from "@/features/product/model/product.utils";

interface PaginationControlsProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const PaginationControls = ({
  page,
  lastPage,
  onPageChange,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) => {
  if (lastPage <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-between">
      {page > 1 ? (
        <button
          type="button"
          onClick={onPrevPage}
          className="group flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          <ArrowLeft className="size-5 transition-colors group-hover:stroke-[#947458]" />
        </button>
      ) : (
        <div />
      )}

      <div className="flex items-center justify-center gap-2">
        {getPaginationItems(page, lastPage).map((paginationItem, index) => {
          if (typeof paginationItem === "string") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 items-center px-1 text-xl font-bold text-black/40"
              >
                ...
              </span>
            );
          }

          const isActivePage = paginationItem === page;

          return (
            <button
              key={paginationItem}
              type="button"
              onClick={() => onPageChange(paginationItem)}
              className={`flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 text-xl font-bold transition-colors ${
                isActivePage
                  ? "bg-[#947458] text-[#f5f5f5]"
                  : "text-black/60 hover:bg-[#947458] hover:text-[#f5f5f5]"
              }`}
            >
              {paginationItem}
            </button>
          );
        })}
      </div>

      {page < lastPage ? (
        <button
          type="button"
          onClick={onNextPage}
          className="group flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          <ArrowRight className="size-5 transition-colors group-hover:stroke-[#947458]" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
