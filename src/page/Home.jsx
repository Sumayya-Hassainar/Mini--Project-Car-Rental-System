import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section with Car Image */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        {/* Background Car Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUSWkW3E85rEZ0EZckBSHDuUF3a4luStGUEg&s"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-blue-400">EasyCar Rentals</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Rent your dream car at the best prices. Explore, filter, and book your ride in just a few clicks!
          </p>
          <Link
            to="/cars"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md"
          >
            Browse Cars
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Wide Selection</h3>
            <p className="text-gray-600">
              Choose from economy cars to luxury vehicles — something for every budget.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
            <p className="text-gray-600">
              Competitive daily rates and exclusive deals for long-term rentals.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Simple search and booking process with instant confirmation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;

