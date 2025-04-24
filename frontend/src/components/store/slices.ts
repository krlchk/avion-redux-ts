import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAvionState, IProduct, IResponse } from "./types";
import axios from "axios";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<IResponse>(
      "http://localhost:5001/api/products",
    );
    console.log(response.data.data);
    return response.data.data;
  },
);

const initialState: IAvionState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null as string | null,
};

export const avionSlice = createSlice({
  name: "avion",
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

export const {} = avionSlice.actions;

export default avionSlice.reducer;
