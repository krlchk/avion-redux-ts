"use client";

import Image from "next/image";
import Link from "next/link";

import { Container, Loader, SimpleButton } from "@/shared/ui";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import { removeProduct } from "@/store/slices/wishlistSlice";

export const WishlistTable = () => {
  const likedProductIds = useAppSelector(
    (state) => state.wishlist.likedProductIds,
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
        <div className="mobile:hidden grid grid-cols-[1.7fr_0.8fr_0.8fr_0.9fr] gap-6 py-6 text-sm font-medium tracking-[0.18em] text-black/40 uppercase">
          <p>Product</p>
          <p>Price</p>
          <p>Stock status</p>
          <p className="text-right">Action</p>
        </div>

        {isLoading && (
          <div className="flex min-h-80 items-center justify-center">
            <Loader />
          </div>
        )}

        {isError && (
          <div className="flex min-h-60 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
            Failed to load wishlist
          </div>
        )}

        {!isLoading && !isError && likedProductIds?.length === 0 && (
          <div className="flex min-h-60 items-center justify-center text-center text-base font-medium text-black/40">
            Your wishlist is empty
          </div>
        )}

        {!isLoading &&
          !isError &&
          likedProductIds.length > 0 &&
          visibleProducts.map((product) => {
            const isInStock = product.stock > 0;

            return (
              <div
                key={product.id}
                className="mobile:grid-cols-1 mobile:gap-10 mobile:flex mobile:flex-col mobile:items-center mobile:justify-center grid grid-cols-[1.7fr_0.8fr_0.8fr_0.9fr] items-center gap-6 border-t border-black/10 py-8"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="mobile:flex mobile:flex-col mobile:items-center mobile:justify-center flex items-center gap-8"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#eeedec]">
                    {product.img ? (
                      <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        unoptimized
                        sizes="80px"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#c0bebd]">
                        No image
                      </div>
                    )}
                  </div>
                  <p className="mobile:text-base text-base font-medium tracking-wide text-black uppercase">
                    {product.title}
                  </p>
                </Link>

                <p className="text-base font-bold text-black">
                  ${product.finalPrice}
                  {product.discountPercent && product.discountPercent > 0 && (
                    <span className="ml-2 text-base font-medium text-black/40 line-through">
                      ${product.price}
                    </span>
                  )}
                </p>

                <p
                  className={`text-sm font-medium tracking-[0.12em] uppercase ${
                    isInStock ? "text-black" : "text-[#FB5454]"
                  }`}
                >
                  {isInStock ? "In stock" : "Out of stock"}
                </p>

                <div className="mobile:col-span-1 mobile:justify-start grid justify-end gap-2">
                  <SimpleButton
                    styles="h-12 min-w-44 !text-sm justify-center uppercase tracking-[0.12em]"
                    text={isInStock ? "+ Add to cart" : "View product"}
                  />
                  <SimpleButton
                    onClick={() => dispatch(removeProduct(product.id))}
                    styles="h-12 min-w-20 !text-sm justify-center uppercase tracking-[0.12em]"
                    text="Remove"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
};
