import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import searchReducer from "./searchSlice";
import messageReducer from "./messageSlice";
import messageFetchReducer from "./mesaageFetchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    search: searchReducer,
    message: messageReducer,
    messageFetch: messageFetchReducer,
  },
});
