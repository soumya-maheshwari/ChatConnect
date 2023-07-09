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
  user: {},
};

export const chatThunk = createAsyncThunk("auth/chat", async (data) => {
  return await axios
    .post(`${backend}`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(chatThunk.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(chatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;
        state.message = "";
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(chatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
