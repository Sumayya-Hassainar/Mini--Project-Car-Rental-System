import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  // ⭐ Example reviews
  const reviews = [
    {
      id: 1,
      name: "Aisha Khan",
      review:
        "Booking was super easy and the car was in perfect condition. Will definitely rent again!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Rahul Menon",
      review:
        "Affordable rates and great customer service. Highly recommend EasyCar Rentals!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Sophia D’Souza",
      review:
        "Loved the wide selection of cars. I got my dream ride for the weekend getaway!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div>
      {/* 🚗 Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center text-white">
        {/* Background Car Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3s46U1OhoL_u5bnKl8izLsjlqz-qY2i2TQg&s"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Welcome to <span className="text-blue-400">EasyCar Rentals</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
            Drive your dream car today 🚘 Affordable, reliable, and hassle-free
            bookings in just a few clicks!
          </p>
          <Link
            to="/cars"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition"
          >
            Browse Cars
          </Link>
        </div>
      </section>

      {/* 🌟 Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition transform">
            <div className="text-blue-500 text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-3">Wide Selection</h3>
            <p className="text-gray-600">
              From economy cars to luxury rides — find the perfect match for
              every trip.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition transform">
            <div className="text-green-500 text-5xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
            <p className="text-gray-600">
              Enjoy competitive rates and exclusive deals for long-term rentals.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:scale-105 transition transform">
            <div className="text-yellow-500 text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
            <p className="text-gray-600">
              Search, compare, and book instantly with our seamless booking
              process.
            </p>
          </div>
        </div>
      </section>

      {/* 💬 Customer Reviews Carousel */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Customers Say
        </h2>

        <div className="max-w-3xl mx-auto relative bg-white shadow-lg rounded-2xl p-8 text-center">
          {/* Current Review */}
          <img
            src={reviews[current].image}
            alt={reviews[current].name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <p className="text-gray-600 italic mb-4">
            “{reviews[current].review}”
          </p>
          <h3 className="text-lg font-semibold text-gray-800">
            – {reviews[current].name}
          </h3>

          {/* Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevReview}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full"
            >
              ⬅
            </button>
            <button
              onClick={nextReview}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full"
            >
              ➡
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
