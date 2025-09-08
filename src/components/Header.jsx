import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("individual"); // default role
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Open login modal from localStorage flag
  useEffect(() => {
    const openLogin = localStorage.getItem("openLogin");
    if (openLogin === "true") {
      setIsOpen(true);
      localStorage.removeItem("openLogin");
    }
  }, []);

  // 🔹 Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const agencyCreds = {
      email: "agency@easycar.com",
      password: "agency123",
    };

    if (role === "agency") {
      if (email === agencyCreds.email && password === agencyCreds.password) {
        localStorage.setItem("email", email);
        localStorage.setItem("role", "agency");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUserRole("agency");
        navigate("/agencydashboard");
        setIsOpen(false);
      } else {
        alert(
          "Invalid Agency credentials! Use:\nEmail: agency@easycar.com\nPassword: agency123"
        );
      }
    } else {
      if (email && password) {
        localStorage.setItem("email", email);
        localStorage.setItem("role", "individual");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUserRole("individual");
        navigate("/cars");
        setIsOpen(false);
      } else {
        alert("Please enter valid email and password!");
      }
    }
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <header
      className={`p-4 shadow-md transition-colors duration-300 
        ${theme === "light" ? "bg-white text-gray-900" : "bg-indigo-950 text-white"}
      `}
    >
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
            <p className="text-sm opacity-80">Rent your dream car easily</p>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Toggle Theme */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg border text-sm
              bg-gray-100 text-black hover:bg-gray-200
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
            "
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Show Login / Logout */}
          {!isLoggedIn ? (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium text-white"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium text-white"
            >
              Logout ({userRole})
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {isOpen && !isLoggedIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-80 relative transition-colors duration-300 
              ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}
          `}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Login</h2>

            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border p-2 rounded text-black"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border p-2 rounded text-black"
                required
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded text-black"
              >
                <option value="individual">Individual</option>
                <option value="agency">Agency</option>
              </select>

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
  );
}

export default Header;

