import React from "react";
import App from "../pages/App";
import Details from "../pages/Details";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "people/:id",
    element: <Details />,
  },
]);


