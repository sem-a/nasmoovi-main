import { Portfolio } from "@prisma/client";
import { api } from "./api";

interface AddPortfolioArgs {
    id: string; // Это, вероятно, идентификатор свадьбы (weedingId)
    formData: FormData; // Добавляем formData как часть типа
}

export const portfolioApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addPortfolio: builder.mutation<Portfolio, AddPortfolioArgs>({
            query: ({ id, formData }) => ({
                url: `/portfolio/add/${id}`,
                method: "POST",
                body: formData,
            }),
        }),
        getAllPortfolio: builder.query<Portfolio[], void>({
            query: () => ({
                url: "/portfolio",
                method: "GET",
            }),
        }),
        getForIdPortfolio: builder.query<Portfolio[], string>({
            query: (id) => ({
                url: `/portfolio/${id}`,
                method: "GET",
            }),
        }),
        updatePreviewPortfolio: builder.mutation<
            Portfolio,
            { id: string; preview: boolean }
        >({
            query: ({ id, preview }) => ({
                url: "/portfolio/update-preview",
                method: "PUT",
                body: { id, preview },
            }),
        }),
        getWeedingPreview: builder.query<Portfolio[], string>({
            query: (id) => ({
                url: `/portfolio/get-preview/${id}`,
                method: "GET",
            }),
        }),
        delWeedingPortfolio: builder.mutation<void, string>({
            query: (id) => ({
                url: `/portfolio/alldel/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAddPortfolioMutation,
    useGetAllPortfolioQuery,
    useGetForIdPortfolioQuery,
    useUpdatePreviewPortfolioMutation,
    useGetWeedingPreviewQuery,
    useDelWeedingPortfolioMutation,
} = portfolioApi;
