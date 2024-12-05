import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserCurrent, patchUser } from "./operations";
import { logOut } from "../auth/operations";

const handleRejected = (state, action) => {
  state.loading = {
    main: false,
    logOut: false,
    allUsers: false,
  };
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    all: [],
    current: null,
    loading: {
      main: false,
      logOut: false,
      allUsers: false,
    },
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading.allUsers = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading.allUsers = false;
      })
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(getUserCurrent.pending, (state) => {
        state.loading.main = true;
      })
      .addCase(getUserCurrent.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading.main = false;
      })
      .addCase(getUserCurrent.rejected, handleRejected)
      .addCase(patchUser.pending, (state) => {
        state.loading.main = true;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.error = null;
        if (state.current && state.current._id === action.payload.data?._id) {
          state.current = action.payload.data;
        }
        state.loading.main = false;
      })
      .addCase(patchUser.rejected, handleRejected)
      .addCase(logOut.pending, (state) => {
        state.loading.logOut = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.all = [];
        state.current = null;
        state.error = null;
        state.loading.logOut = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
