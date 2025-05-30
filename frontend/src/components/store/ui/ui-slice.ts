import { createSlice } from "@reduxjs/toolkit";
import { IUiState } from "./ui-types";

const initialState: IUiState = {
  isPopUpOpen: false,
  isBurgerModalOpen: false,
  isUserModalOpen: false,
  isAddProductModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showPopup(state) {
      state.isPopUpOpen = true;
    },
    hidePopup(state) {
      state.isPopUpOpen = false;
    },
    showBurgerModal(state) {
      state.isBurgerModalOpen = true;
    },
    hideBurgerModal(state) {
      state.isBurgerModalOpen = false;
    },
    showUserModal(state) {
      state.isUserModalOpen = true;
    },
    hideUserModal(state) {
      state.isUserModalOpen = false;
    },
    showProductModal(state) {
      state.isAddProductModalOpen = true;
    },
    hideProductModal(state) {
      state.isAddProductModalOpen = false;
    },
  },
});

export const {
  showPopup,
  hidePopup,
  showBurgerModal,
  hideBurgerModal,
  showUserModal,
  hideUserModal,
  showProductModal,
  hideProductModal,
} = uiSlice.actions;
export default uiSlice.reducer;
