"use client";

import { Container } from "@/shared/ui";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import { removeProduct } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { WishlistProductRow } from "./WishlistProductRow";
import { WishlistStatusMessage } from "./WishlistStatusMessage";
import { WishlistTableHeader } from "./WishlistTableHeader";

export const WishlistTable = () => {
  const likedProductIds = useAppSelector(
    (state) => state.wishlist.likedProductIds ?? [],
  );
  const dispatch = useAppDispatch();
  const wishlistQuery =
    likedProductIds.length > 0
      ? { ids: likedProductIds, limit: likedProductIds.length }
      : skipToken;
  const { data, isError, isLoading } = useGetProductsQuery(wishlistQuery);

  const likedProducts = data?.data ?? [];
  const visibleProducts = likedProducts.filter((product) =>
    likedProductIds.includes(product.id),
  );

  return (
    <Container className="py-16 text-black">
      <div>
        <WishlistTableHeader />
        <WishlistStatusMessage
          isError={isError}
          isLoading={isLoading}
          isEmpty={likedProductIds.length === 0}
        />

        {!isLoading &&
          !isError &&
          likedProductIds.length > 0 &&
          visibleProducts.map((product) => (
            <WishlistProductRow
              key={product.id}
              product={product}
              onAddToCart={() => {
                if (product.stock <= 0) return;

                dispatch(addToCart({ count: 1, id: product.id }));
                dispatch(removeProduct(product.id));
              }}
              onRemove={() => dispatch(removeProduct(product.id))}
            />
          ))}
      </div>
    </Container>
  );
};
