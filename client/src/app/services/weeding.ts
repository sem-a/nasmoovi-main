import { Weeding } from "@prisma/client";
import { api } from "./api";

export const weedingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllWeedings: builder.query<Weeding[], void>({
            query: () => ({
                url: "/weeding",
                method: "GET",
            }),
        }),
        getWeeding: builder.query<Weeding, string>({
            query: (id) => ({
                url: `/weeding/${id}`,
                method: "GET",
            }),
        }),
        addWeeding: builder.mutation<Weeding, Weeding>({
            query: (weeding) => ({
                url: "/weeding/add",
                method: "POST",
                body: weeding,
            }),
        }),
        editWeeding: builder.mutation<string, Weeding>({
            query: (weeding) => ({
                url: `/weeding/edit/${weeding.id}`,
                method: "PUT",
                body: weeding,
            }),
        }),
        delWeeding: builder.mutation<string, string>({
            query: (id) => ({
                url: `/weeding/del/${id}`,
                method: "POST",
                body: { id },
            }),
        }),
    }),
});

export const {
    useGetAllWeedingsQuery,
    useGetWeedingQuery,
    useAddWeedingMutation,
    useDelWeedingMutation,
    useEditWeedingMutation
} = weedingApi;