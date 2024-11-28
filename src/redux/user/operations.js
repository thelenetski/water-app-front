import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://water-app-back-1n3p.onrender.com";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getUserCurrent = createAsyncThunk(
  "users/current",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/users/current/${userId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const patchUser = createAsyncThunk(
  "users/patchUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/current/${user.id}`, user);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
