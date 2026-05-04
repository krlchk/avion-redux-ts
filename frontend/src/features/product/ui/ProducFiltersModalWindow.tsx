import type { ReactNode } from "react";

interface ProductFiltersModalWindowProps {
  onClose: () => void;
  isClosing: boolean;
  children: ReactNode;
}

export const ProductFiltersModalWindow = ({
  onClose,
  isClosing,
  children,
}: ProductFiltersModalWindowProps) => {
  return (
    <div onClick={onClose} className="fixed inset-0 z-10 bg-black/5">
      <section
        onClick={(e) => e.stopPropagation()}
        className={`h-full w-1/2 overflow-y-auto border-r border-[#9A7B60] bg-white mobile:w-[80%] xs:w-full ${
          isClosing
            ? "animate-[slide-out-left_300ms_ease-in_forwards]"
            : "animate-[slide-in-left_300ms_ease-out]"
        }`}
      >
        {children}
      </section>
    </div>
  );
};
