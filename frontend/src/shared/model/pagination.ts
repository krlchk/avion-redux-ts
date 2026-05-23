import { useMemo, useState } from "react";

interface UseClientPaginationParams<T> {
  items: T[];
  itemsPerPage: number;
}

export const useClientPagination = <T>({
  items,
  itemsPerPage,
}: UseClientPaginationParams<T>) => {
  const [page, setPage] = useState(1);
  const totalItems = items.length;
  const lastPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, itemsPerPage, page]);

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  return {
    page,
    setPage,
    lastPage,
    startItem,
    endItem,
    totalItems,
    paginatedItems,
    onPrevPage,
    onNextPage,
  };
};
