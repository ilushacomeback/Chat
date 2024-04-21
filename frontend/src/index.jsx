import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import "./assets/App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import ErrorPage from "./routes/ErrorPage";
import App from "./App.jsx";

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
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);

reportWebVitals();
