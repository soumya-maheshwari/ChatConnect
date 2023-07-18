import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backend = "http://localhost:5000/api/";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  showToast: false,
  message: "",
  response: "",
  profile: "",
  user: {},
};

export const registerUser = createAsyncThunk("auth/signup", async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  return await axios
    .post(`${backend}signup`, data, config)
    .then((res) => {
      console.log(res);

      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  return await axios
    .post(`${backend}login`, data, config)
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // console.log(err);
      return err.response;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;
        state.message = "drkkjtio";

        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.showToast = true;
          state.user = action.payload.data.user;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // localStorage.setItem("access token", action.payload.data.accessToken);
        state.profile = action.payload.data;
        state.isLoading = false;
        state.response = action.payload.data.msg;

        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.user = action.payload.data.user;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
