import { createBrowserRouter, redirect } from "react-router-dom";
import LayoutPage from "./pages/layout/LayoutPage";
import HomePage from "./pages/home/HomePage";
import AddPage from "./pages/add/AddPage";
import EditPage from "./pages/edit/EditPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import DetailPage from "./pages/detail/DetailPage";

const checkIsLogin = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

const checkHasLogin = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    loader: checkIsLogin,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add",
        element: <AddPage />,
      },
      {
        path: "/update/:id",
        element: <EditPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: checkHasLogin,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: checkHasLogin,
  },
  {
    path: "*",
    loader: checkHasLogin,
  },
]);

export default router;
