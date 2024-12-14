import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AlbumState {
    albumDetails: any;
    loading: boolean;
    error: string | null;
}

const initialState: AlbumState = {
    albumDetails: null,
    loading: false,
    error: null,
};

export const fetchAlbumDetails = createAsyncThunk(
    "album/fetchAlbumDetails",
    async (id: string, { getState }: any) => {
        const state = getState();
        const accessToken = state.auth.accessToken; // Access token-ը auth state-ից
        const response = await fetch(
            `https://api.spotify.com/v1/albums/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch album details");
        }
        return response.json();
    }
);

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.albumDetails = action.payload;
            })
            .addCase(fetchAlbumDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default albumSlice.reducer;
