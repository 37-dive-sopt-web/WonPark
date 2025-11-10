import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { LoginPage } from "./pages/LoginPage/LonginPage";
import { MyInfoTab } from "./pages/MyInfoTab/MyInfoTab";
import { SignupPage } from "./pages/SignupPage/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/my-info",
    element: <MyInfoTab />,
  },
]);

export default router;
