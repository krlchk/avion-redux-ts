"use client";

import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { ProductDetailsProps } from "../model/types";
import { Container, Loader } from "@/shared/ui";
import Image from "next/image";
import { useGetCategoryByIdQuery } from "@/store/services/categoriesApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetDesignerByIdQuery } from "@/store/services/usersApi";
import { ProductReviews } from "./ProductReviews";
import { useGetReviewByProductIdQuery } from "@/store/services/reviewsApi";
import { mapProductReviewsToItems } from "../model/productPage.utils";
import { ProductReviewForm } from "./ProductReviewForm";

export const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const { data: category } = useGetCategoryByIdQuery(
    product?.categoryId ?? skipToken,
  );
  const { data: designer } = useGetDesignerByIdQuery(
    product?.designerId ?? skipToken,
  );

  const { data: reviewsData } = useGetReviewByProductIdQuery(
    product?.id ?? skipToken,
  );

  const reviews = reviewsData?.data
    ? mapProductReviewsToItems(reviewsData.data)
    : [];

  if (isLoading) {
    return (
      <Container className="flex min-h-120 items-center justify-center py-16">
        <Loader />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-16 text-center text-sm font-medium text-[#FB5454]">
        Failed to load product
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-16 text-center text-xl font-medium text-black">
        Product not found
      </Container>
    );
  }

  return (
    <Container className="tablet:py-16 mobile:py-10 py-24">
      <section className="tablet:grid-cols-1 tablet:gap-10 mobile:grid-cols-1 mobile:gap-8 grid grid-cols-2 gap-16 text-black">
        <div className="tablet:mx-auto tablet:max-w-150 mobile:max-w-none relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-[#eeedec]">
          {product.img ? (
            <Image
              src={product.img}
              alt={product.title}
              fill
              unoptimized
              sizes="(max-width: 834px) 100vw, (max-width: 1279px) 600px, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-bold text-[#c0bebd]">
              Image not provided
            </div>
          )}
        </div>

        <div className="mobile:px-0 flex flex-col justify-center px-4">
          <div className="mobile:px-6 mobile:py-8 bg-[#f5f5f5] px-12 py-14">
            <h1 className="mobile:text-4xl xs:text-3xl text-6xl leading-tight font-bold text-black">
              {product.title}
            </h1>
            <div className="my-10 flex flex-col gap-2">
              {category && (
                <p className="text-2xl font-bold text-black">
                  Category:{" "}
                  <span className="font-medium text-[#947458]">
                    {category.name}
                  </span>
                </p>
              )}
              {designer && (
                <p className="text-2xl font-bold text-black">
                  Designer:{" "}
                  <span className="font-medium text-[#947458]">
                    {designer.name}
                  </span>
                </p>
              )}
            </div>
            <p className="mobile:text-2xl mt-6 text-3xl font-medium text-black/80">
              ${product.finalPrice}
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="ml-4 text-xl text-black/40 line-through">
                  ${product.price}
                </span>
              )}
            </p>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-black">Description</h2>
              <p className="mt-6 text-xl leading-8 font-medium text-black/60">
                {product.description}
              </p>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-black">Dimensions</h2>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-lg font-bold text-black">Height</p>
                  <p className="mt-4 text-xl font-medium text-black/60">
                    {product.height}cm
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-black">Width</p>
                  <p className="mt-4 text-xl font-medium text-black/60">
                    {product.width}cm
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-black">Depth</p>
                  <p className="mt-4 text-xl font-medium text-black/60">
                    {product.depth}cm
                  </p>
                </div>
              </div>
            </div>

            <div className="mobile:flex-col mobile:items-stretch mt-16 flex items-center justify-between gap-6">
              <div className="flex items-center gap-8">
                <p className="text-xl font-bold text-black">Amount:</p>
                <div className="flex h-14 items-center bg-[#eeedec] text-xl font-medium text-black/60">
                  <button className="h-full px-6 text-black/30 transition-colors hover:text-[#947458]">
                    -
                  </button>
                  <span className="px-4 text-black">1</span>
                  <button className="h-full px-6 text-black/30 transition-colors hover:text-[#947458]">
                    +
                  </button>
                </div>
              </div>

              <button className="mobile:w-full bg-[#947458] px-14 py-4 text-xl font-bold whitespace-nowrap text-[#f5f5f5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <ProductReviews reviews={reviews} />
      <ProductReviewForm productId={product.id} />
    </Container>
  );
};
