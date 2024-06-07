import { Wedding } from "@prisma/client";
import { api } from "./api";

type getInfoWeddingProps = {
    name: string,
    description: string
}

const base_url = '/wedding/';

export const weddingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllWeddings: builder.query<Wedding[], void>({
            query: () => ({
                url: base_url,
                method: "GET",
            }),
        }),
        getWedding: builder.query<Wedding, string>({
            query: (id) => ({
                url: `${base_url}${id}`,
                method: "GET",
            }),
        }),
        addWedding: builder.mutation<Wedding, Wedding>({
            query: (wedding) => ({
                url: `${base_url}add`,
                method: "POST",
                body: wedding,
            }),
        }),
        editWedding: builder.mutation<string, Wedding>({
            query: (wedding) => ({
                url: `${base_url}edit/${wedding.id}`,
                method: "PUT",
                body: wedding,
            }),
        }),
        delWedding: builder.mutation<string, string>({
            query: (id) => ({
                url: `${base_url}del/${id}`,
                method: "POST",
                body: { id },
            }),
        }),
        getInfoWedding: builder.query<getInfoWeddingProps, string>({
            query: (id) => ({
                url: `${base_url}name/${id}`,
                method: "GET",
            })
        })
    }),
});

export const {
    useGetAllWeddingsQuery,
    useGetWeddingQuery,
    useAddWeddingMutation,
    useDelWeddingMutation,
    useEditWeddingMutation,
    useGetInfoWeddingQuery,
} = weddingApi;