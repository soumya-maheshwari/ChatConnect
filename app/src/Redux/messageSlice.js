import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  showToast: false,
  messagesArray: "",
  currentChat: "",
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

    return await Api.post(``, data, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
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

      // SEND MESSAGE
      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.currentChat = action.payload;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })

      .addCase(sendMessageThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default messageSlice.reducer;
