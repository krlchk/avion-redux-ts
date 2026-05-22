import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WishlistState } from "../model/types";

const initialState: WishlistState = {
  likedProductIds: [],
};

const getLikedProductIds = (state: WishlistState) => {
  if (!Array.isArray(state.likedProductIds)) {
    state.likedProductIds = [];
  }

  return state.likedProductIds;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.likedProductIds = action.payload;
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const likedProductIds = getLikedProductIds(state);
      const isLiked = likedProductIds.includes(productId);

      if (isLiked) {
        state.likedProductIds = likedProductIds.filter(
          (id) => id !== productId,
        );
      } else {
        likedProductIds.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.likedProductIds = getLikedProductIds(state).filter(
        (id) => id !== action.payload,
      );
    },
    clearWishlist: (state) => {
      state.likedProductIds = [];
    },
  },
});

export const { setWishlist, toggleWishlist, removeProduct, clearWishlist } =
  wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
