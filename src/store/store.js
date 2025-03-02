import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
  },
});
