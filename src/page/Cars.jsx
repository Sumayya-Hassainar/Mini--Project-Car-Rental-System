import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCar } from "../redux/carSlice";


function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({});
  const userRole = localStorage.getItem("role"); // 👈 check role

  const searchTerm = useSelector((state) => state.search.searchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetch cars from API
        const res = await axios.get(
          "https://my-json-server.typicode.com/sumayya-hassainar/api/cars"
        );
        const apiCars = res.data;

        // Fetch agency-added cars from localStorage
        const localCars = JSON.parse(localStorage.getItem("agencyCars")) || [];
        setCars([...apiCars, ...localCars]);

        // Fetch ratings from localStorage
        const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
        setRatings(storedRatings);
      } catch (err) {
        setError("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ⭐ Handle user rating
  const handleRating = (carId, rating) => {
    const updatedRatings = {
      ...ratings,
      [carId]: Array.isArray(ratings[carId])
        ? [...ratings[carId], rating]
        : ratings[carId]
        ? [ratings[carId], rating]
        : [rating],
    };

    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  // ⭐ Get average rating for a car
  const getAverageRating = (carId) => {
    let carRatings = ratings[carId];
    if (!Array.isArray(carRatings)) {
      if (carRatings) {
        carRatings = [carRatings];
      } else {
        return 0;
      }
    }
    if (carRatings.length === 0) return 0;

    const sum = carRatings.reduce((a, b) => a + b, 0);
    return (sum / carRatings.length).toFixed(1);
  };

  // 🔍 Filter cars by search term
  const filteredCars = cars.filter(
    (car) =>
      car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🚘 Handle Book Now click
  const handleBookNow = (car) => {
    dispatch(setCar(car));
    navigate("/booking");
  };

  if (loading) return <p className="p-6">Loading cars...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* ✅ Top Section with Dashboard + Manage Issues (only for agency) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Cars</h1>

        {userRole === "agency" && (
          <div className="flex space-x-3">
            <Link
              to="/agencydashboard"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/issuemanagement"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Manage Issues
            </Link>
            <Link to="/booking-status" className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Booking Status</Link>
          </div>
        )}
      </div>

      {/* 🚘 Car List */}
      {filteredCars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id || Math.random()}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={car.image || "https://via.placeholder.com/300"}
                alt={car.name || "Car"}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{car.name}</h2>
              <p className="text-gray-600">Color: {car.color || "Unknown"}</p>
              <p className="text-gray-800 font-bold">₹{car.price}</p>

              {/* ⭐ Average Rating */}
              <p className="mt-2 text-yellow-600 font-semibold">
                ⭐ {getAverageRating(car.id)} / 5
              </p>

              {/* ⭐ Rating Buttons */}
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(car.id, star)}
                    className="text-yellow-500 hover:scale-110"
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* 👤 Individual users see Book Now + Report Issue */}
              {userRole === "individual" && (
                <>
                  <button
                    onClick={() => handleBookNow(car)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Book Now
                  </button>

                  <Link
                    to="/report-issue"
                    className="mt-2 inline-block bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Report Issue
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;
