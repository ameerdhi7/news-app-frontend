import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "./message";

import AuthService from "../services/auth.service";
import StorageService from "../services/storage.service";

const user = JSON.parse(StorageService.get("user"));

export const register = createAsyncThunk(
    "/api/v1/register",
    async ({name, email, password}, thunkAPI) => {
        try {
            const response = await AuthService.register(name, email, password);
            StorageService.set("user", JSON.stringify(response.data.user));
            StorageService.set("token", response.data.token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "/api/v1/login",
    async ({email, password}, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return {user: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("/api/v1/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const {reducer} = authSlice;
export default reducer;
