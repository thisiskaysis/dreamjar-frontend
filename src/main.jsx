import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import BrowseCampaigns from './pages/BrowseCampaigns'
import CampaignPage from './pages/CampaignPage'
import LoginPage from './pages/LoginPage'
import "./main.css"

const myRouter = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/account", element: <AccountPage />},
      {path: "/browse", element: <BrowseCampaigns />},
      {path: "/campaign", element: <CampaignPage />},
      {path: "/login", element: <LoginPage />}
    ]
  }])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>,
)
