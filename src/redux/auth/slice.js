import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  logOut,
  refreshUser,
  googleSignIn,
  confirmGoogleOAuth,
} from "./operations";

const handleRejected = (state) => {
  state.loading = {
    signUp: false,
    signIn: false,
    googleSignIn: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    url: null,
    isSignedIn: false,
    isRefreshing: false,
    loading: {
      signUp: false,
      signIn: false,
      googleSignIn: false,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading.signUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading.signUp = false;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, (state) => {
        state.loading.signIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading.signIn = false;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(googleSignIn.pending, (state) => {
        state.loading.googleSignIn = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.url = action.payload;
        state.loading.googleSignIn = false;
      })
      .addCase(googleSignIn.rejected, handleRejected)
      .addCase(confirmGoogleOAuth.pending, (state) => {
        state.loading.googleSignIn = true;
      })
      .addCase(confirmGoogleOAuth.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading.googleSignIn = false;
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
