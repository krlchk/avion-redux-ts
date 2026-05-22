"use client";

import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import type { Product } from "@/features/product/model/types";
import { Container } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { CartItem } from "@/store/model/types";
import { useGetProductsQuery } from "@/store/services/productsApi";
import {
  decreaseCartProduct,
  increaseCartProduct,
  removeCartProduct,
} from "@/store/slices/cartSlice";
import { formatCartPrice } from "../model/cart.utils";
import { CartProductRow } from "./CartProductRow";
import { CartStatusMessage } from "./CartStatusMessage";
import { CartSummary } from "./CartSummary";
import { CartTableHeader } from "./CartTableHeader";

export const CartTable = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartProducts ?? []);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const cartProductIds = cartItems.map((product) => product.id);
  const cartQuery =
    cartProductIds.length > 0
      ? { ids: cartProductIds, limit: cartProductIds.length }
      : skipToken;

  const { data, isError, isLoading } = useGetProductsQuery(cartQuery);

  const products = data?.data ?? [];
  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );
  const cartProducts = cartItems.reduce<{ item: CartItem; product: Product }[]>(
    (result, item) => {
      const product = productsById.get(item.id);

      if (product) {
        result.push({ item, product });
      }

      return result;
    },
    [],
  );

  const subtotal = cartProducts.reduce((result, product) => {
    return result + product.product.finalPrice * product.item.count;
  }, 0);

  const formattedSubtotal = formatCartPrice(subtotal);
  const checkoutProducts = [
    ...cartProducts.map((p) => {
      return {
        productId: p.item.id,
        quantity: p.item.count,
      };
    }),
  ];

  return (
    <Container className="py-16 text-black">
      <section className="tablet:grid-cols-1 mobile:grid-cols-1 grid grid-cols-[1fr_420px] gap-14">
        <div>
          <CartTableHeader />
          <CartStatusMessage
            isError={isError}
            isLoading={isLoading}
            isEmpty={cartItems.length === 0}
          />

          {!isLoading &&
            !isError &&
            cartProducts.map(({ item, product }) => (
              <CartProductRow
                key={product.id}
                item={item}
                product={product}
                onDecrease={() => dispatch(decreaseCartProduct(product.id))}
                onIncrease={() => dispatch(increaseCartProduct(product.id))}
                onRemove={() => dispatch(removeCartProduct(product.id))}
              />
            ))}
        </div>

        <CartSummary
          checkoutProducts={checkoutProducts}
          isPromoOpen={isPromoOpen}
          isCheckoutDisabled={checkoutProducts.length === 0}
          subtotal={formattedSubtotal}
          onPromoToggle={() => setIsPromoOpen((isOpen) => !isOpen)}
        />
      </section>
    </Container>
  );
};
