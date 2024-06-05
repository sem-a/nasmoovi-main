import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/home";
import Login from "./pages/admin/admin-login";
import WeedingsPage from "./pages/weedings";
import PortfolioPage from "./pages/portfolio";
import ProtectedRoute from "./components/protected-route";
import WeedingAdd from "./pages/admin/weeding-add";
import PortfolioAdd from "./pages/admin/portfolio-add";
import SelectPreview from "./pages/admin/select-preview";
import WeedingAll from "./pages/admin/weeding-all";
import "./index.css";
import Err404 from "./pages/404";
import VideoUploadForm from "./pages/admin/video-add";
import VideosPage from "./pages/videos";
import VideoAll from "./pages/admin/video-all";
import LoadingScreen from "./components/loading";

const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <Home />,
    },
    {
        path: PATHS.login,
        element: <Login />,
    },
    {
        path: PATHS.weedings,
        element: <WeedingsPage />,
    },
    {
        path: `${PATHS.weedingOne}/:id`,
        element: <PortfolioPage />,
    },
    {
        path: PATHS.weedingAdd,
        element: (
            <ProtectedRoute>
                <WeedingAdd />
            </ProtectedRoute>
        ),
    },
    {
        path: `${PATHS.portfolioAdd}/:id`,
        element: (
            <ProtectedRoute>
                <PortfolioAdd />
            </ProtectedRoute>
        ),
    },
    {
        path: `${PATHS.preview}/:id`,
        element: (
            <ProtectedRoute>
                <SelectPreview />
            </ProtectedRoute>
        ),
    },
    {
        path: PATHS.weedingAll,
        element: (
            <ProtectedRoute>
                <WeedingAll />
            </ProtectedRoute>
        ),
    },
    {
        path: PATHS.videoAdd,
        element: (
            <ProtectedRoute>
                <VideoUploadForm />
            </ProtectedRoute>
        ),
    },
    {
        path: PATHS.video,
        element: <VideosPage />,
    },
    {
        path: PATHS.videoAll,
        element: (
            <ProtectedRoute>
                <VideoAll />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <Err404 />,
    },
    {
        path: PATHS.loading,
        element: <LoadingScreen />,
    },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
