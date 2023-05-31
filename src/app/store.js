import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import newsReducer from "./slices/news";
import preferencesReducer from "./slices/preferences";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    news: newsReducer,
    preferences: preferencesReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});
