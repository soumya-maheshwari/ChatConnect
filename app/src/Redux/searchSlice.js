import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backend = "http://localhost:5000/api/";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  userList: [],
};

export const searchUser = createAsyncThunk("user/search", async (data) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  // console.log(user.accessToken);
  const config = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  return await axios
    .get(`${backend}all_users?search=${data}`, config)
    .then((res) => {
      // console.log(data);
      // console.log(res);
      // console.log(`${backend}all_users?${data}`);
      return res;
    })
    .catch((err) => {
      // console.log(err);
      return err.response;
    });
});

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;

        // console.log(action.payload);
        state.userList = action.payload.data.user;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
        }
      })
      .addCase(searchUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default searchSlice.reducer;
