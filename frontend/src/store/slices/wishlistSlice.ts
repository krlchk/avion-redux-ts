import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  likedProductIds: string[];
}

const initialState: WishlistState = {
  likedProductIds: [],
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
      const isLiked = state.likedProductIds.includes(productId);

      if (isLiked) {
        state.likedProductIds = state.likedProductIds.filter(
          (id) => id !== productId,
        );
      } else {
        state.likedProductIds.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.likedProductIds = state.likedProductIds.filter(
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
