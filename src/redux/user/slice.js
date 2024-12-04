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
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(getUserCurrent.pending, handlePending)
      .addCase(getUserCurrent.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addCase(getUserCurrent.rejected, handleRejected)
      .addCase(patchUser.pending, handlePending)
      .addCase(patchUser.fulfilled, (state, action) => {
        state.error = null;
        if (state.current && state.current._id === action.payload.data?._id) {
          state.current = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(patchUser.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.all = [];
        state.current = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
