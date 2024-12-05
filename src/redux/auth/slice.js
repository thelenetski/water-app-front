import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  logOut,
  refreshUser,
  googleSignIn,
  confirmGoogleOAuth,
} from "./operations";

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
    url: null,
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
      .addCase(googleSignIn.pending, handlePending)
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.url = action.payload;
        state.loading = false;
      })
      .addCase(googleSignIn.rejected, handleRejected)
      .addCase(confirmGoogleOAuth.pending, handlePending)
      .addCase(confirmGoogleOAuth.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading = false;
      })
      .addCase(confirmGoogleOAuth.rejected, handleRejected)
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
