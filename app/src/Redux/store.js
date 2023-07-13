import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    chat: chatReducer,

    search: searchReducer,
  },
});
