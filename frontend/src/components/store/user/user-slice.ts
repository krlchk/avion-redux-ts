import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEmail,
  IEmailOrderConfirm,
  ILogin,
  IRegister,
  IUser,
  IUserState,
} from "./user-types";
import axios from "axios";

export const sendEmail = createAsyncThunk<IEmail, { email: string }>(
  "email/sendEmail",
  async ({ email }) => {
    const response = await axios.post<IEmail>(
      "http://localhost:5001/api/send-email",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data;
  },
);
export const sendEmailConfirmOrder = createAsyncThunk<
  IEmailOrderConfirm,
  { name: string | undefined; email: string | undefined }
>("email/sendEmailOrderConfirm", async ({ name, email }) => {
  const response = await axios.post<IEmailOrderConfirm>(
    "http://localhost:5001/api/send-email-order-confitmation",
    { name, email },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
});

export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string }
>("login/loginUser", async ({ email, password }) => {
  const response = await axios.post<ILogin>(
    "http://localhost:5001/api/login",
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data.user;
});

export const registerUser = createAsyncThunk<
  IUser,
  { name: string; email: string; password: string }
>("register/registerUser", async ({ name, email, password }) => {
  const response = await axios.post<IRegister>(
    "http://localhost:5001/api/user",
    { name, email, password },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data.user;
});

const initialState: IUserState = {
  user: null,
  status: "idle",
  error: null as string | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //MESSAGE SENDING
    builder.addCase(sendEmail.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(sendEmail.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to send email";
    });
    //USER LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to login";
    });
    //USER REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to register";
    });
  },
});

export const { setUser, logout, resetStatus } = userSlice.actions;
export default userSlice.reducer;
