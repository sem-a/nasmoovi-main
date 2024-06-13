import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/home";
import Login from "./pages/admin/admin-login";
import WeddingsPage from "./pages/weddings";
import PortfolioPage from "./pages/portfolio";
import ProtectedRoute from "./components/protected-route";
import WeddingAdd from "./pages/admin/wedding-add";
import PortfolioAdd from "./pages/admin/portfolio-add";
import SelectPreview from "./pages/admin/select-preview";
import WeddingAll from "./pages/admin/wedding-all";
import Err404 from "./pages/404";
import VideoUploadForm from "./pages/admin/video-add";
import VideosPage from "./pages/videos";
import VideoAll from "./pages/admin/video-all";
import LoadingScreen from "./components/loading";
import "./index.css";
import { Helmet } from "react-helmet";
import ServerError from "./components/error";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: (
      <div>
        <Helmet>
          <title>Свадебный фотограф Санкт-Петербург</title>
          <meta
            name="description"
            content="Добро пожаловать на страницу фотографа Анастасии Соколовой Nasmoovi 
            из Санкт-Петербурга. Здесь вы найдете информацию обо мне, мои работы, отзывы 
            клиентов и ссылки на портфолио. Откройте мир красоты и эмоций через объектив 
            моей камеры."
          />
        </Helmet>
        <Home />
      </div>
    ),
  },
  {
    path: PATHS.login,
    element: (
      <div>
        <Helmet>
          <title>Административная панель | Логин</title>
        </Helmet>
        <Login />
      </div>
    ),
  },
  {
    path: PATHS.weddings,
    element: (
      <div>
        <Helmet>
          <title>
            Свадебные серии | Портфолио фотографа Nasmoovi в Санкт-Петербурге
          </title>
          <meta
            name="description"
            content="Проведите время, наслаждаясь свадебными сериями фотографа 
            Анастасии Соколовой Nasmoovi в Санкт-Петербурге. Погрузитесь в мир романтики 
            и великолепия свадебной фотографии прямо сейчас"
          />
        </Helmet>
        <WeddingsPage />
      </div>
    ),
  },
  {
    path: `${PATHS.weddingOne}/:id`,
    element: <PortfolioPage />,
  },
  {
    path: PATHS.weddingAdd,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Добавить свадьбу</title>
          </Helmet>
          <WeddingAdd />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: `${PATHS.portfolioAdd}/:id`,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Загрузить портфолио</title>
          </Helmet>
          <PortfolioAdd />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: `${PATHS.preview}/:id`,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Выбрать превью</title>
          </Helmet>
          <SelectPreview />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.weddingAll,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Все свадьбы</title>
          </Helmet>
          <WeddingAll />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.videoAdd,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Добавить видео</title>
          </Helmet>
          <VideoUploadForm />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.video,
    element: (
      <div>
        <Helmet>
          <title>
            Свадебные видео | Портфолио видеографа Nasmoovi в Санкт-Петербурге
          </title>
          <meta
            name="description"
            content="Погрузитесь в атмосферу свадебных моментов 
          с видео от фотографа и видеографа Анастасии Соколовой Nasmoovi. 
          Позвольте мне запечатлеть вашу историю любви в неповторимом видеоформате"
          />
        </Helmet>
        <VideosPage />
      </div>
    ),
  },
  {
    path: PATHS.videoAll,
    element: (
      <ProtectedRoute>
        <div>
          <Helmet>
            <title>Административная панель | Все видео</title>
          </Helmet>
          <VideoAll />
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Helmet>
          <title>404</title>
        </Helmet>
        <Err404 />
      </div>
    ),
  },
  {
    path: PATHS.loading,
    element: (
      <div>
        <Helmet>
          <title>Загрузка...</title>
        </Helmet>
        <LoadingScreen />
      </div>
    ),
  },
  {
    path: PATHS.errorPage,
    element: (
      <div>
        <Helmet>
          <title>505</title>
        </Helmet>
        <ServerError />
      </div>
    ),
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
