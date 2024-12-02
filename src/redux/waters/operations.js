import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://water-app-back-1n3p.onrender.com";

export const getWaterMonthly = createAsyncThunk(
  "water/getWaterMonthly",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/water/month");
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
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/water/day");
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
      return response.data;
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
      const response = await axios.patch(`api/water/${water.id}`, water);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);
