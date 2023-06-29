import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backend = "http://localhost:5000/api/";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  response: "",
  user: {},
};
export const registerUser = createAsyncThunk("auth/signup", async (data) => {
  return await axios
    .post(`${backend}signup`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;

        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
