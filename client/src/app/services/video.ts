import { Video } from "@prisma/client";
import { api } from "./api";

export const videoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addVideo: builder.mutation<Video, FormData>({
            query: (formData) => ({
                url: `/video/add`,
                method: "POST",
                body: formData,
            }),
        }),
        getAllVideo: builder.query<Video[], void>({
            query: () => ({
                url: "/video",
                method: "GET",
            }),
        }),
        delVideo: builder.mutation<void, string>({
            query: (id) => ({
                url: `/video/del/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAddVideoMutation,
    useDelVideoMutation,
    useGetAllVideoQuery
} = videoApi;
