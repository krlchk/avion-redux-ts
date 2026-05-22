import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../model/types";

const initialState: AuthState = {
  token: null,
  tempToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.tempToken = null;
    },
    setTempToken: (state, action: PayloadAction<string>) => {
      state.tempToken = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.tempToken = null;
    },
  },
});

export const { setToken, setTempToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
