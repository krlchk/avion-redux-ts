import { configureStore } from "@reduxjs/toolkit";
import avionReducer from "../components/store/slices";

export const store = configureStore({
  reducer: {
    avion: avionReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
