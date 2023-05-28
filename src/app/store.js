import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import newsReducer from "./slices/news";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  news: newsReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
