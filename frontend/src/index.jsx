import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import './index.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
