import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backend = "http://localhost:5000/api/chat/";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  showToast: false,
  message: "",
  response: "",
};

export const accessChatThunk = createAsyncThunk(
  "chat/accessChat",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    console.log(user.accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    // console.log(config, "config");

    return await axios
      .get(`${backend}fetch_chat`, config)
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

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(accessChatThunk.pending, (state) => {
        state.isLoading = true;
        // state.message = "";
      })
      .addCase(accessChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(accessChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
