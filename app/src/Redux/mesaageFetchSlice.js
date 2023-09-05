import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  showToast: false,
  messagesArray: "",
  //   currentChat: "",
  message: "",
  response: "",
};

export const fetchAllMessagesForAChatThunk = createAsyncThunk(
  "message/fetch_AllMessages",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get(`message/${data}`, data)
      .then((res) => {
        // console.log(data);
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const messageFetchSlice = createSlice({
  name: "messageFetch",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL MESSAGES IN A CHAT
      .addCase(fetchAllMessagesForAChatThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchAllMessagesForAChatThunk.fulfilled, (state, action) => {
        // state.isLoading = false;
        console.log(action.payload);
        // console.log(action.payload.data.messages);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.isLoading = false;

          state.messagesArray = action.payload.data.messages;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })

      .addCase(fetchAllMessagesForAChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default messageFetchSlice.reducer;
