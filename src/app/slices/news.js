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
        searchNewsRequest: (state) => {
            state.loading = true; // Set loading to true when searching news
            state.error = null; // Clear any previous error
        },
        searchNewsSuccess: (state, action) => {
            state.loading = false; // Set loading to false when search is successful
            state.articles = action.payload; // Update articles with search results
        },
        searchNewsFailure: (state, action) => {
            state.loading = false; // Set loading to false on search failure
            state.error = action.payload; // Set error message
        },
    },
});

// Extract the action creators
export const {
    fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure,
    searchNewsRequest, searchNewsSuccess, searchNewsFailure,
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

export const searchNews = (searchCriteria) => async (dispatch) => {
    dispatch(searchNewsRequest()); // Dispatch the search news request action
    try {
        const response = await NewsService.search(searchCriteria); // Make the API request to search news
        dispatch(searchNewsSuccess(response.data.data.articles)); // Dispatch the search news success action with the search results
    } catch (error) {
        dispatch(searchNewsFailure(error.message)); // Dispatch the search news failure action with the error message
    }
};


export default newsSlice.reducer;
