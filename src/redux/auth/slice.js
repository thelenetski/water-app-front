import { createSlice } from "@reduxjs/toolkit";
import { signUp, signIn, logOut, refreshUser } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isSignedIn: false,
    isRefreshing: false,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading = false;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading = false;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.isSignedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        // state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
