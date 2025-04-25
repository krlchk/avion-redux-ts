import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmail, IUser, IUserState } from "./user-types";
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

const initialState: IUserState = {
  user: null,
  email: "",
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
    enterEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { setUser, logout, enterEmail,resetStatus } = userSlice.actions;
export default userSlice.reducer;
