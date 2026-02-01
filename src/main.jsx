import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage/Homepage.jsx";
import CampaignBrowse from "./pages/CampaignBrowse/CampaignBrowse.jsx";
import CampaignPage from "./pages/CampaignPage/CampaignPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";

import NavBar from "./components/NavBar/NavBar.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import "./main.css"
import OAuthListener from "./components/OAuthListener.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <>
    <NavBar />
    <OAuthListener />
    </>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dreamjars", element: <CampaignBrowse /> },
      { path: "/dreamjars/:id", element: <CampaignPage /> },
      { path: "/login", element: <LoginPage />},
      { path: "/signup", element: <SignUpPage />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);