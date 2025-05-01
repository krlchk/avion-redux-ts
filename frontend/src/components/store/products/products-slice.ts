import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProductsState,
  IProduct,
  IResponseForProduct,
  IDesigner,
  IType,
  IResponseForDesigner,
  IResponseForType,
  ICartItem,
  IOrder,
} from "./products-types";
import axios from "axios";
import { slice } from "lodash";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<IResponseForProduct>(
      "http://localhost:5001/api/products",
    );
    return response.data.data;
  },
);

export const fetchDesigners = createAsyncThunk<IDesigner[]>(
  "designers/fetchDesigners",
  async () => {
    const response = await axios.get<IResponseForDesigner>(
      "http://localhost:5001/api/designers",
    );
    return response.data.data;
  },
);

export const fetchTypes = createAsyncThunk<IType[]>(
  "types/fetchTypes",
  async () => {
    const response = await axios.get<IResponseForType>(
      "http://localhost:5001/api/types",
    );
    return response.data.data;
  },
);

export const createCheckoutSession = createAsyncThunk<
  { url: string },
  ICartItem[],
  { rejectValue: string }
>("cart/createCheckoutSession", async (cartItems) => {
  const response = await axios.post<{ url: string }>(
    "http://localhost:5001/api/create-checkout-session",
    { products: cartItems },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
});

export const createOrder = createAsyncThunk<
  IOrder,
  {
    name: string | undefined;
    surname: string;
    email: string | undefined;
    phone: number;
    address: string;
    comment: string;
    items: ICartItem[];
  }
>(
  "order/createOrder",
  async ({ name, surname, email, phone, address, comment, items }) => {
    const response = await axios.post(
      "http://localhost:5001/api/create",
      { name, surname, email, phone, address, comment, items },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data.data;
  },
);

const initialState: IProductsState = {
  products: [],
  filteredProducts: [],
  loadedProducts: [],
  types: [],
  designers: [],
  selectedDesigners: [],
  selectedTypes: [],
  selectedPrices: [],
  cartItems: [],
  unitProduct: null,
  limitForLoadedProducts: 3,
  loadedProductIndex: 3,
  isLoadMore: true,
  status: "idle",
  error: null as string | null,
  searchName: "",
  itemCount: 1,
  itemToCart: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMoreProducts(state) {
      const newLoadedProductIndex =
        state.loadedProductIndex + state.limitForLoadedProducts;
      const newLoadedProducts = slice(
        state.filteredProducts,
        0,
        newLoadedProductIndex,
      );
      state.loadedProducts = newLoadedProducts;
      state.loadedProductIndex = newLoadedProductIndex;
      state.isLoadMore = state.filteredProducts.length > newLoadedProductIndex;
    },
    toggleTypeSelection(state, action: PayloadAction<number>) {
      const typeId = action.payload;
      if (state.selectedTypes.includes(typeId)) {
        state.selectedTypes = state.selectedTypes.filter((id) => id !== typeId);
      } else {
        state.selectedTypes.push(typeId);
      }
      state.isLoadMore = false;
    },
    toggleDesignerSelection(state, action: PayloadAction<number>) {
      const designerId = action.payload;
      if (state.selectedDesigners.includes(designerId)) {
        state.selectedDesigners = state.selectedDesigners.filter(
          (id) => id !== designerId,
        );
      } else {
        state.selectedDesigners.push(designerId);
      }
      state.isLoadMore = false;
    },
    togglePriceSelection(state, action: PayloadAction<number>) {
      const priceId = action.payload;
      if (state.selectedPrices.includes(priceId)) {
        state.selectedPrices = state.selectedPrices.filter(
          (id) => id !== priceId,
        );
      } else {
        state.selectedPrices.push(priceId);
      }
      state.isLoadMore = false;
    },
    updateSearchName(state, action: PayloadAction<string>) {
      state.searchName = action.payload;
      state.isLoadMore = false;
    },
    filterProducts(state) {
      let filtered = state.products;
      if (state.selectedTypes.length > 0) {
        filtered = filtered.filter((product) =>
          state.selectedTypes.includes(product.type_id),
        );
      }
      if (state.selectedDesigners.length > 0) {
        filtered = filtered.filter((product) =>
          state.selectedDesigners.includes(product.designer_id),
        );
      }
      if (state.selectedPrices.length > 0) {
        filtered = filtered.filter((product) => {
          return state.selectedPrices.some((priceId) => {
            if (priceId === 1) {
              return product.cost >= 0 && product.cost <= 100;
            } else if (priceId === 2) {
              return product.cost >= 101 && product.cost <= 250;
            } else if (priceId === 3) {
              return product.cost >= 251 && product.cost <= 10000;
            }
            return true;
          });
        });
      }
      if (state.searchName) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(state.searchName.toLowerCase()),
        );
      }
      if (state.loadedProducts.length === state.filteredProducts.length) {
        state.isLoadMore = false;
      }
      state.loadedProducts = filtered;
    },
    increaseItemCount(state) {
      state.itemCount = state.itemCount + 1;
    },
    decreaseItemCount(state) {
      state.itemCount = state.itemCount - 1;
    },
    resetItemCount(state) {
      state.itemCount = initialState.itemCount;
    },
    ////CART functionallity
    setItemToCart(state, action) {
      const incomingProduct: IProduct = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.choosenProduct.id === incomingProduct.id,
      );
      if (!existingProduct) {
        state.cartItems.push({
          amount: state.itemCount,
          choosenProduct: incomingProduct,
        });
      } else {
        existingProduct.amount += state.itemCount;
      }
    },
    resetCart(state) {
      state.cartItems = initialState.cartItems;
    },
    increaseCartItemQuantity(state, action: PayloadAction<number>) {
      const cartItem = state.cartItems.find(
        (item) => item.choosenProduct.id === action.payload,
      );

      if (cartItem) {
        cartItem.amount += 1;
      }
    },
    decreaseCartItemQuantity(state, action: PayloadAction<number>) {
      const cartItem = state.cartItems.find(
        (item) => item.choosenProduct.id === action.payload,
      );

      if (cartItem && cartItem.amount > 1) {
        cartItem.amount -= 1;
      }
    },
    removeItemFormCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.choosenProduct.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    //products
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loadedProducts = slice(action.payload, 0, 3);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
    //designers
    builder.addCase(fetchDesigners.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDesigners.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.designers = action.payload;
    });
    builder.addCase(fetchDesigners.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
    //types
    builder.addCase(fetchTypes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.types = action.payload;
    });
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
  },
});

export const {
  removeItemFormCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  resetCart,
  resetItemCount,
  increaseItemCount,
  decreaseItemCount,
  loadMoreProducts,
  filterProducts,
  updateSearchName,
  toggleTypeSelection,
  toggleDesignerSelection,
  togglePriceSelection,
  setItemToCart,
} = productsSlice.actions;

export default productsSlice.reducer;
