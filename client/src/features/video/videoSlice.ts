import { Video } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { videoApi } from "../../app/services/video";

interface InitialState {
    video: Video[] | null;
}

const initialState: InitialState = {
    video: null,
};

const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder.addMatcher(
            videoApi.endpoints.getAllVideo.matchFulfilled,
            (state, action) => {
                state.video = action.payload;
            }
        );
    },
});

export default slice.reducer;

export const selectVideo = (state: RootState) => state.video;
