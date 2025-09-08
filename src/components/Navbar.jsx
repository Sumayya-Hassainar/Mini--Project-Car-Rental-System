
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm } from "../redux/searchSlice"

function Navbar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.search.searchTerm)

  return (
    <nav className="bg-gray-800 text-white py-3 px-6 flex flex-col sm:flex-row justify-between items-center gap-12">
      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400 font-medium">Home</Link>
        <Link to="/cars" className="hover:text-blue-400 font-medium">Cars</Link>
        <Link to="/booking" className="hover:text-blue-400 font-medium">Booking</Link>
        <Link to="/register" className="hover:text-blue-400 font-medium">Register</Link>
        <Link to="/contact" className="hover:text-blue-400 font-medium">Contact</Link>
        
      </div>

      {/* Search Bar */}
      <div className="flex gap-1 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="px-3 py-1 rounded bg-white text-black w-full sm:w-64 focus:outline-none"
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white font-medium"
        >
          Search
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
