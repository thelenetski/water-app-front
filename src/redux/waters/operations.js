import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWaterMonthly = createAsyncThunk(
  "water/getWaterMonthly",
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get("api/water/month", {params: { month, year },});
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const getWaterDaily = createAsyncThunk(
  "water/getWaterDaily",
  async ({ day, month, year }, thunkAPI) => {
    try {
      const response = await axios.get("api/water/day", {
        params: { day, month, year },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async (water, thunkAPI) => {
    try {
      const response = await axios.post("api/water", water);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const response = await axios.delete(`api/water/${waterId}`);
      console.log(response);
      return waterId;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const patchWater = createAsyncThunk(
  "water/patchWater",
  async (water, thunkAPI) => {
    try {
      const response = await axios.patch(`api/water/${water.id}`, {
        amount: water.amount,
        date: water.date,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);
