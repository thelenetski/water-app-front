import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://water-app-back-1n3p.onrender.com";
axios.defaults.baseURL = "http://localhost:3000";

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const signUp = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("api/auth/signup", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.data.accessToken);
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("api/auth/signin", credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.data.accessToken);
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("api/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || "Unknown error");
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token available");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axios.get("api/users/current");
      return res.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (token) return true;

      return false;
    },
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    console.log("refresh start");
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token available");
      }
      setAuthHeader(token);
      const response = await axios.post("api/auth/refresh");

      console.log("refresh", response);
      const { accessToken } = response.data.data;

      setAuthHeader(accessToken);
      return { accessToken };
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);

/*-----------------GOOGLE--------------------*/

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`api/auth/get-oauth-url`);
      return response.data.data.url;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const confirmGoogleOAuth = createAsyncThunk(
  "auth/confirmGoogleOAuth",
  async (code, thunkAPI) => {
    if (code) {
      try {
        const res = await axios.post("api/auth/confirm-oauth", { code });
        setAuthHeader(res.data.data.accessToken);
        return res.data;
      } catch (error) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
        return thunkAPI.rejectWithValue(error.message || "Unknown error");
      }
    }
  }
);
