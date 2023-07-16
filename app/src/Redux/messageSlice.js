import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const backend = "http://localhost:5000/api/message/";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  showToast: false,
  message: "",
  response: "",
};

export const sendMessageThunk = createAsyncThunk(
  "messgae/send",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await axios
      .post(`${backend}`, data, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const fetchAllMessagesForAChatThunk = createAsyncThunk(
  "message/fetch_AllChats",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await axios
      .get(`${backend}${data}`, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })

      .addCase(sendMessageThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(fetchAllMessagesForAChatThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchAllMessagesForAChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })

      .addCase(fetchAllMessagesForAChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default messageSlice.reducer;
