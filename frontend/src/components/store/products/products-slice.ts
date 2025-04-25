import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductsState, IProduct, IResponse } from "./products-types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<IResponse>(
      "http://localhost:5001/api/products",
    );
    return response.data.data;
  },
);

const initialState: IProductsState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null as string | null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
