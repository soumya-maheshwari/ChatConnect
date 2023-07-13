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
  const user = localStorage.getItem("userInfo");

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
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
        state.userList = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(searchUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default searchSlice.reducer;
