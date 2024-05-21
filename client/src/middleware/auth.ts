import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (acion, listenerApi) => {
        listenerApi.cancelActiveListeners();
        if (acion.payload.token) {
            localStorage.setItem("token", acion.payload.token);
        }
    },
});
