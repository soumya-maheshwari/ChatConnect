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
  chatArray: [],
};

export const accessChatThunk = createAsyncThunk(
  "chat/accessChat",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await axios
      .post(`${backend}create_chat`, data, config)

      .then((res) => {
        // console.log(res);
        // console.log(data);

        return res;
      })
      .catch((err) => {
        // console.log(data);

        // console.log(err);
        return err.response;
      });
  }
);

export const accesAllTheChatsThunk = createAsyncThunk(
  "chat/all_chats",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

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
export const createGroupChat = createAsyncThunk(
  "chat/create_GroupChat",
  async (data) => {
    return await axios
      .get(`${backend}fetch_chat`, data)
      .then((res) => {
        console.log(data);
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
      })

      .addCase(accesAllTheChatsThunk.pending, (state) => {
        state.isLoading = true;
        // state.message = "";
      })
      .addCase(accesAllTheChatsThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
          state.chatArray = action.payload.data.user;
        } else {
          state.isSuccess = false;
        }
        console.log(action.payload);
      })
      .addCase(accesAllTheChatsThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });

    // .addCase(createGroupChat.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(createGroupChat.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   console.log(action.payload);
    // })
    // .addCase(createGroupChat.rejected, (state, action) => {
    //   state.isLoading = true;
    //   state.isError = true;
    //   console.log(action.payload);
    // });
  },
});

export default chatSlice.reducer;
