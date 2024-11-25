import { createSlice } from "@reduxjs/toolkit";
import {
  getWaterMonthly,
  getWaterDaily,
  addWater,
  deleteWater,
  patchWater,
} from "./operations";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const watersSlice = createSlice({
  name: "water",
  initialState: {
    monthly: [],
    daily: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaterMonthly.pending, handlePending)
      .addCase(getWaterMonthly.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthly = action.payload;
      })
      .addCase(getWaterMonthly.rejected, handleRejected)
      .addCase(getWaterDaily.pending, handlePending)
      .addCase(getWaterDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.daily = action.payload;
      })
      .addCase(getWaterDaily.rejected, handleRejected)
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(patchWater.pending, handlePending)
      .addCase(patchWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map((contact) => {
          if (contact.id === action.payload.id) {
            return (contact = action.payload);
          }
          return contact;
        });
      })
      .addCase(patchWater.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.monthly = [];
        state.daily = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const watersReducer = watersSlice.reducer;
