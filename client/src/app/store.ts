import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import weddings from "../features/wedding/weddingSlice";
import portfolio from "../features/portfolio/portfolioSlice";
import comments from '../features/comment/commentSlice';
import video from '../features/video/videoSlice';
import { api } from "./services/api";
import { listenerMiddleware } from "../middleware/auth";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        weddings,
        portfolio,
        comments,
        video
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
