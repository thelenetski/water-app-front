import { createSlice } from "@reduxjs/toolkit";
import {
  getWaterMonthly,
  getWaterDaily,
  addWater,
  deleteWater,
  patchWater,
} from "./operations";
import { logOut } from "../auth/operations";

const handleRejected = (state, action) => {
  state.loading = {
    main: false,
    monthly: false,
    daily: false,
    activeDay: false,
  };
  state.error = action.payload;
};

const today = new Date();

const watersSlice = createSlice({
  name: "water",
  initialState: {
    monthly: [],
    daily: [],
    activeDay: {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    },
    activeMonth: {
      month: today.getMonth(),
      year: today.getFullYear(),
    },
    loading: {
      main: false,
      monthly: false,
      daily: false,
      activeDay: false,
    },
    error: null,
  },
  reducers: {
    addActiveDay(state, action) {
      state.activeDay = { ...state.activeDay, ...action.payload };
    },
    addActiveMonth(state, action) {
      state.activeMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaterMonthly.pending, (state) => {
        state.loading.monthly = true;
      })
      .addCase(getWaterMonthly.fulfilled, (state, action) => {
        state.loading.monthly = false;
        state.error = null;
        state.monthly = action.payload.data;
      })
      .addCase(getWaterMonthly.rejected, handleRejected)
      .addCase(getWaterDaily.pending, (state) => {
        state.loading.daily = true;
      })
      .addCase(getWaterDaily.fulfilled, (state, action) => {
        state.loading.daily = false;
        state.error = null;
        state.daily = action.payload.data;
      })
      .addCase(getWaterDaily.rejected, handleRejected)
      .addCase(addWater.pending, (state) => {
        state.loading.main = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading.main = false;
        state.error = null;
        state.daily.push(action.payload.data);
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(deleteWater.pending, (state) => {
        state.loading.main = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading.main = false;
        state.error = null;
        const index = state.daily.findIndex(
          (water) => water._id === action.payload
        );
        if (index !== -1) {
          state.daily.splice(index, 1);
        }
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(patchWater.pending, (state) => {
        state.loading.main = true;
      })
      .addCase(patchWater.fulfilled, (state, action) => {
        state.loading.main = false;
        state.error = null;
        state.daily = state.daily.map((water) => {
          if (water && water._id === action.payload.data?._id) {
            return action.payload.data;
          }
          return water;
        });
      })
      .addCase(patchWater.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.monthly = [];
        state.daily = [];
        state.error = null;
        state.loading.main = false;
      });
  },
});

export const { addActiveDay, addActiveMonth } = watersSlice.actions;

export const watersReducer = watersSlice.reducer;
