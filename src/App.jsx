import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import Booking from './page/Booking'
import Register from './page/Register'
import Contact from './page/Contact'
import Layout from './components/Layout'
import Cars from './page/Cars'
import ReportIssue from './page/ReportIssue'
import AgencyDashboard from './agency/AgencyDashboard'
import ProtectedRoute from './router/ProtectedRoute'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout setSearchTerm={setSearchTerm} />,
      children: [
        { path: '/', element: <Home /> },

        { path: 'register', element: <Register /> },
        { path: 'contact', element: <Contact /> },
        { path: 'cars', element: <Cars searchTerm={searchTerm} /> },


        // Individual users only
        {
          path: 'booking',
          element: (
            <ProtectedRoute allowedRoles={['individual']}>
              <Booking />
            </ProtectedRoute>
          ),
        },
        {
          path: 'report-issue',
          element: (
            <ProtectedRoute allowedRoles={['individual']}>
              <ReportIssue />
            </ProtectedRoute>
          ),
        },

        // Agency only
        {
          path: 'agencydashboard',
          element: (
            <ProtectedRoute allowedRoles={['agency']}>
              <AgencyDashboard />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
