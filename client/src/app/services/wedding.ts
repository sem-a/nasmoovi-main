import { Wedding } from "@prisma/client";
import { api } from "./api";

export const weddingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllWeddings: builder.query<Wedding[], void>({
            query: () => ({
                url: "/wedding",
                method: "GET",
            }),
        }),
        getWedding: builder.query<Wedding, string>({
            query: (id) => ({
                url: `/wedding/${id}`,
                method: "GET",
            }),
        }),
        addWedding: builder.mutation<Wedding, Wedding>({
            query: (wedding) => ({
                url: "/wedding/add",
                method: "POST",
                body: wedding,
            }),
        }),
        editWedding: builder.mutation<string, Wedding>({
            query: (wedding) => ({
                url: `/wedding/edit/${wedding.id}`,
                method: "PUT",
                body: wedding,
            }),
        }),
        delWedding: builder.mutation<string, string>({
            query: (id) => ({
                url: `/wedding/del/${id}`,
                method: "POST",
                body: { id },
            }),
        }),
    }),
});

export const {
    useGetAllWeddingsQuery,
    useGetWeddingQuery,
    useAddWeddingMutation,
    useDelWeddingMutation,
    useEditWeddingMutation
} = weddingApi;