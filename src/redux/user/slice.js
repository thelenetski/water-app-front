import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserCurrent, patchUser } from "./operations";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    all: [],
    current: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(getUserCurrent.pending, handlePending)
      .addCase(getUserCurrent.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getUserCurrent.rejected, handleRejected)
      .addCase(patchUser.pending, handlePending)
      .addCase(patchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload.data);
        if (state.current && state.current._id === action.payload.data?._id) {
          state.current = action.payload.data;
        } else {
          console.error("User ID mismatch or state.current is undefined.");
        }
      })
      .addCase(patchUser.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.all = [];
        state.current = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
