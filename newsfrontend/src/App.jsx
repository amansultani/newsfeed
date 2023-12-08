import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ArticlesPage from "./pages/Articles";
import ErrorPage from "./pages/Error";
import RootLayout, { loader as categoryLoader } from "./pages/Root";
import CategoryPreferencesPage, {
  action as categoryAction,
} from "./pages/CategoryPreferences";
import Home from "./components/home/Home";
import SourcePreferencesPage from "./pages/SourcePreferences";
import AccountSettingPage, {
  action as updateAccount,
  loader as accountDetailLoader,
} from "./pages/AccountSetting";
import { checkAuthLoader } from "./components/util/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInPage, { action as loginAction } from "./pages/SignInPage";
import SignUp, { action as signUpAction } from "./pages/SignUpPage";
import { action as logoutAction } from "./pages/Logout";
import ArticleDetailPage, {
  loader as ArticleDetailLoader,
} from "./pages/ArticleDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "category-loader",
    loader: categoryLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories/:categoryId/news",
        element: <ArticlesPage />,
        loader: checkAuthLoader,
      },
      {
        path: "categories/:categoryId/news/:newsId",
        element: <ArticleDetailPage />,
        loader: ArticleDetailLoader,
      },
      {
        path: "setting/preferences/categories",
        element: <CategoryPreferencesPage />,
        action: categoryAction,
        loader: checkAuthLoader,
      },
      {
        path: "setting/preferences/sources",
        element: <SourcePreferencesPage />,
        loader: checkAuthLoader,
      },
      {
        path: "setting/account",
        element: <AccountSettingPage />,
        loader: accountDetailLoader,
        action: updateAccount,
      },
    ],
  },
  {
    path: "/login",
    element: <SignInPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUp />,
    action: signUpAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
