import { Wedding } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { weddingApi } from "../../app/services/wedding";
import { RootState } from "../../app/store";

interface InitialState {
    weddings: Wedding[] | null;
}

const initialState: InitialState = {
    weddings: null,
};

const slice = createSlice({
    name: "weddings",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder.addMatcher(
            weddingApi.endpoints.getAllWeddings.matchFulfilled,
            (state, action) => {
                state.weddings = action.payload;
            }
        );
    },
});

export default slice.reducer;

export const selectWeddings = (state: RootState) => state.weddings;
