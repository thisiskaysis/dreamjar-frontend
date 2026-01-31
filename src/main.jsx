import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage/Homepage.jsx";
import CampaignBrowse from "./pages/CampaignBrowse/CampaignBrowse.jsx";
import CampaignPage from "./pages/CampaignPage/CampaignPage.jsx";

import NavBar from "./components/NavBar/NavBar.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dreamjars", element: <CampaignBrowse /> },
      { path: "/dreamjars/:id", element: <CampaignPage /> },
      { path: "/login", element: <LoginPage />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);