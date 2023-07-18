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
        // console.log(res);

        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);
export const createGroupChat = createAsyncThunk(
  "chat/create_GroupChat",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await axios

      .post(`${backend}create_GroupChat`, data, config)
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

export const renameGroupThunk = createAsyncThunk(
  "chat/renameGroup",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    return await axios

      .patch(`${backend}rename_group`, data, config)
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

      // CREATE CHAT
      .addCase(accessChatThunk.pending, (state) => {
        state.isLoading = true;
        // state.message = "";
      })
      .addCase(accessChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "sdhkjnkj";
        // console.log(action.payload);
      })
      .addCase(accessChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // ACCESS ALL THE CHATS FOR A USER
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
        // console.log(action.payload);
      })
      .addCase(accesAllTheChatsThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // CREATE GROUPCHAT
      .addCase(createGroupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        console.log(action.payload);
      })

      // RENAME GROUP
      .addCase(renameGroupThunk.pending, (state) => {
        state.isLoading = true;
        // state.message = "";
        state.isSuccess = false;
      })
      .addCase(renameGroupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;
        console.log(action.payload);
        if (action.payload.data.success) {
          // state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }
      })
      .addCase(renameGroupThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
