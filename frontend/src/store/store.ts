import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import "./services/productsApi";
import "./services/categoriesApi";
import { wishlistReducer } from "./slices/wishlistSlice";
import { authReducer } from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { cartReducer } from "./slices/cartSlice";
import "./services/authApi";

const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "wishlist", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
