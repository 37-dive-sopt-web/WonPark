import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/App" replace />,
  },
  {
    path: "/App",
    element: <App />,
  },
]);

export default router;
