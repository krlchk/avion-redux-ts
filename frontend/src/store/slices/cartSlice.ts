import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  count: number;
  id: string;
}

interface CartState {
  cartProducts: CartItem[];
}

const initialState: CartState = {
  cartProducts: [],
};

const getCartProducts = (state: CartState) => {
  if (!Array.isArray(state.cartProducts)) {
    state.cartProducts = [];
  }

  return state.cartProducts;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartProducts = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartProducts = getCartProducts(state);
      const count = Math.max(action.payload.count, 1);
      const cartItem = cartProducts.find(
        (product) => product.id === action.payload.id,
      );

      if (cartItem) {
        cartItem.count += count;
        return;
      }

      cartProducts.push({ ...action.payload, count });
    },
    increaseCartProduct: (state, action: PayloadAction<string>) => {
      const cartItem = getCartProducts(state).find(
        (product) => product.id === action.payload,
      );

      if (cartItem) {
        cartItem.count += 1;
      }
    },
    decreaseCartProduct: (state, action: PayloadAction<string>) => {
      const cartItem = getCartProducts(state).find(
        (product) => product.id === action.payload,
      );

      if (!cartItem) return;

      cartItem.count = Math.max(cartItem.count - 1, 1);
    },
    removeCartProduct: (state, action: PayloadAction<string>) => {
      state.cartProducts = getCartProducts(state).filter(
        (product) => product.id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  increaseCartProduct,
  decreaseCartProduct,
  removeCartProduct,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
