// preferencesSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import PreferencesService from "../services/preferences.service";
import UserService from "../services/user.service";


const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        categories: [],
        authors: [],
        sources: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchPreferencesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPreferencesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload.preferences.category;
            state.authors = action.payload.preferences.author;
            state.sources = action.payload.preferences.source;
        },
        fetchPreferencesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        savePreferencesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        savePreferencesSuccess: (state) => {
            state.loading = false;
        },
        savePreferencesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchPreferencesRequest,
    fetchPreferencesSuccess,
    fetchPreferencesFailure,
    savePreferencesRequest,
    savePreferencesSuccess,
    savePreferencesFailure,
} = preferencesSlice.actions;

export const fetchPreferences = () => async (dispatch) => {
    dispatch(fetchPreferencesRequest());
    try {
        const response = await PreferencesService.getPreferencesOptions();
        dispatch(fetchPreferencesSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchPreferencesFailure(error.message));
    }
};

export const savePreferences = (preferences) => async (dispatch) => {
    dispatch(savePreferencesRequest());
    try {
        await PreferencesService.savePreferencesOptions(preferences);
        dispatch(savePreferencesSuccess());

        // Call fetchPreferences thunk by directly invoking the dispatch function
        await dispatch(fetchPreferences());
    } catch (error) {
        dispatch(savePreferencesFailure(error.message));
    }
};

export default preferencesSlice.reducer;
