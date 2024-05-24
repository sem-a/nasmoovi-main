import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { PATHS } from "../../paths";

const baseQuery = fetchBaseQuery({
    baseUrl: `${PATHS.URL}api`,
    prepareHeaders(headers, { getState }) {
        const token =
            (getState() as RootState).auth.user?.token ||
            localStorage.getItem("token");
        
        if (token && token !== null) {
            headers.set('authorization', `Bearer ${token}`)
        }
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
