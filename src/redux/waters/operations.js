import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "/*---------LINK WATER-----------*/";

export const getWaterMonthly = createAsyncThunk(
  "water/getWaterMonthly",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/monthly");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getWaterDaily = createAsyncThunk(
  "water/getWaterDaily",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/daily");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async (water, thunkAPI) => {
    try {
      const response = await axios.post("/water", water);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${waterId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const patchWater = createAsyncThunk(
  "water/patchWater",
  async (water, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${water.id}`, water);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
