import { Weeding } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { weedingApi } from "../../app/services/weeding";
import { RootState } from "../../app/store";

interface InitialState {
    weedings: Weeding[] | null;
}

const initialState: InitialState = {
    weedings: null,
};

const slice = createSlice({
    name: "weedings",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder.addMatcher(
            weedingApi.endpoints.getAllWeedings.matchFulfilled,
            (state, action) => {
                state.weedings = action.payload;
            }
        );
    },
});

export default slice.reducer;

export const selectWeedings = (state: RootState) => state.weedings;
