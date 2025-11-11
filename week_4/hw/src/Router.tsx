import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { DeleteAccountTab } from "./pages/DeleteAccountTab/DeleteAccountTab";
import { LoginPage } from "./pages/LoginPage/LonginPage";
import { MyInfoTab } from "./pages/MyInfoTab/MyInfoTab";
import { MyPage } from "./pages/MyPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { UserLookupTab } from "./pages/UserLookupTab/UserLookupTab";

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
    element: <Navigate to="/mypage/info" replace />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
    children: [
      {
        path: "info",
        element: <MyInfoTab />,
      },
      {
        path: "users",
        element: <UserLookupTab />,
      },
      {
        path: "delete",
        element: <DeleteAccountTab />,
      },
      {
        index: true,
        element: <Navigate to="info" replace />,
      },
    ],
  },
]);

export default router;
