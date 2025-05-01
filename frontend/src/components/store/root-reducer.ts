import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products/products-slice";
import uiReducer from "./ui/ui-slice";
import userReducer from "./user/user-slice";

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
