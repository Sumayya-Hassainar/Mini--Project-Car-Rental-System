import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div>
        <Header/>
        <Navbar/>
        <Outlet/>
        <div style={{padding:"50px"}}></div>
        <Footer/>
    </div>
  )
}

export default Layout