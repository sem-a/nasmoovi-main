import { Portfolio } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { portfolioApi } from "../../app/services/portfolio";

interface InitialState {
    portfolio: Portfolio[] | null;
}

const initialState: InitialState = {
    portfolio: null,
};

const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers(builder) {
        builder.addMatcher(
            portfolioApi.endpoints.getAllPortfolio.matchFulfilled,
            (state, action) => {
                state.portfolio = action.payload;
            }
        );
    },
});

export default slice.reducer;

export const selectPortfolio = (state: RootState) => state.portfolio;
