import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import uiReducer from "./ui/uiSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
