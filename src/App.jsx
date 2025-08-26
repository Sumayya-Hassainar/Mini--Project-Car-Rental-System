import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import Booking from './page/Booking'
import Register from './page/Register'
import Contact from './page/Contact'
import Layout from './components/Layout'
import Cars from './page/Cars'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout setSearchTerm={setSearchTerm} />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'cars', element: <Cars searchTerm={searchTerm} /> },
        { path: 'booking', element: <Booking /> },
        { path: 'register', element: <Register /> },
        { path: 'contact', element: <Contact /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
