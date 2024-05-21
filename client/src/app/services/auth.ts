import { Users } from '@prisma/client';
import { api } from './api';

export type UserData = Omit<Users, 'id'>;

type ResponseLoginData = Users & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            }),
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            }),
        }),
        current: builder.query<ResponseLoginData, void>({
            query: (userData) => ({
                url: '/user/current',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;

export const { endpoints: { login, register, current} } = authApi;