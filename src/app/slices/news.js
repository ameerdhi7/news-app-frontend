// newsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import NewsService from "../services/news.service";

// Create a slice using createSlice
const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Action reducer for fetching news request
        fetchNewsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        // Action reducer for fetching news success
        fetchNewsSuccess: (state, action) => {
            state.loading = false;
            state.articles = action.payload;
        },
        // Action reducer for fetching news failure
        fetchNewsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Extract the action creators
export const {
    fetchNewsRequest,
    fetchNewsSuccess,
    fetchNewsFailure,
} = newsSlice.actions;

// Define a thunk action creator to fetch news
export const fetchNews = () => async (dispatch) => {
    dispatch(fetchNewsRequest()); // Dispatch the fetch news request action
    try {
        const response = await NewsService.getHomeFeed(); // Make the API request
        dispatch(fetchNewsSuccess(response.data.data.articles[0])); // Dispatch the fetch news success action with the response data
    } catch (error) {
        dispatch(fetchNewsFailure(error.message)); // Dispatch the fetch news failure action with the error message
    }
};

export default newsSlice.reducer;
