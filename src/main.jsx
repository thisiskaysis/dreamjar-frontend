import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout.jsx";
import HomePage from "./pages/HomePage/Homepage.jsx";
import CampaignBrowse from "./pages/CampaignBrowse/CampaignBrowse.jsx";
import CampaignPage from "./pages/CampaignPage/CampaignPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

import "./main.css"
import OAuthSuccess from "./components/OAuthSuccess.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <>
    <Layout />
    </>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "/dreamjars", element: <CampaignBrowse /> },
      { path: "/dreamjars/:id", element: <CampaignPage /> },
      { path: "/account/", element: <AccountPage />},
      { path: "/login", element: <LoginPage />},
      { path: "/signup", element: <SignUpPage />},
      { path: "/oauth-success", element: <OAuthSuccess /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);