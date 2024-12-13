// src/redux/searchSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Պահպանում ենք որոնման տեքստը և արդյունքները
interface SearchState {
    query: string;
    results?: [];
    loading: boolean;
}

const initialState: SearchState = {
    query: "",
    results: [],
    loading: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<[]>) => {
            state.results = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setQuery, setResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
