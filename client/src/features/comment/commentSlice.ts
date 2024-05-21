import { Comments } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { commentApi } from "../../app/services/comment"; 

interface InitialState {
    comments: Comments[] | null;
}

const initialState: InitialState = {
    comments: null,
};

const slice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder.addMatcher(
            commentApi.endpoints.getAllComment.matchFulfilled,
            (state, action) => {
                state.comments = action.payload;
            }
        );
    },
});

export default slice.reducer;

export const selectComments = (state: RootState) => state.comments;
