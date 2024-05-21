import { Comments } from "@prisma/client";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllComment: builder.query<Comments[], void>({
            query: () => ({
                url: "/comment",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllCommentQuery
} = commentApi;