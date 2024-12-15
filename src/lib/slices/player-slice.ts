import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: "player",
    initialState: {
        isPlaying: false,
        currentTrack: "5dfjLGpkKVu450Jp7xdIem",
    },
    reducers: {
        togglePlay: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        },
    },
});

export const { togglePlay, setCurrentTrack } = playerSlice.actions;
export default playerSlice.reducer;
