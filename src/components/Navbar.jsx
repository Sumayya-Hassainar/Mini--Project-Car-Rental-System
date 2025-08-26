
import React, { useState } from "react";
import { Link} from "react-router-dom";

function Navbar({setSearchTerm}) {
    const[query,setQuery]=useState('')
    const handleSearch=(e)=>{
        e.preventDefault()
        setSearchTerm
    }
  return (
    /*Navigation Link */
    <nav className="bg-gray-800 text-white py-3 px-6 flex gap-6  flex justify-between">
      <Link to="/" className="hover:text-blue-400">Home</Link>
      <Link to="/cars" className="hover:text-blue-400">Cars</Link>
      <Link to="/booking" className="hover:text-blue-400">Booking</Link>
      <Link to="/register" className="hover:text-blue-400">Register</Link>
      <Link to="/contact" className="hover:text-blue-400">Contact</Link>
    {/*Search Bar */}
    <form onSubmit={handleSearch} className="flex gap-2 bg-white rounded "> 
        <input type="text" placeholder="Search cars..." value={query} onChange={(e)=>setQuery(e.target.value)} className="px-3 py-1 rounded text-black" />
        <button type="submit" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600" >Search</button>
    </form>

    </nav>

  );
}

export default Navbar;
