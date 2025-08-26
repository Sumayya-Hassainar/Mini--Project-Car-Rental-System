import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-indigo-950 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuog5IXaUAfqc2G4Mrd6ipisMSgkX2mbvb-w&s"
            alt="Easy Car Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Easy Car</h1>
            <p className="text-sm text-gray-300">Rent your dream car easily</p>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Login
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Login</h2>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded text-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded text-black"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;
