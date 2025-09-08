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
  const [loyaltyPoints, setLoyaltyPoints] = useState(
    parseInt(localStorage.getItem("loyaltyPoints")) || 0
  );
  const [quickViewCar, setQuickViewCar] = useState(null); // modal state
  const [show360, setShow360] = useState(false);

  const userRole = localStorage.getItem("role"); // "individual" / "agency"
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Fetch cars & ratings
  useEffect(() => {
    const fetchCars = async () => {
      try {

        const res = await axios.get(
          "https://my-json-server.typicode.com/sumayya-hassainar/api/cars"
        );
        const apiCars = res.data;

        
        const localCars = JSON.parse(localStorage.getItem("agencyCars")) || [];
        setCars([...apiCars, ...localCars]);


        const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
        setRatings(storedRatings);
      } catch (err) {
        setError("⚠️ Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // 🔹 Handle rating
  const handleRating = (carId, rating) => {
    const userId = localStorage.getItem("userId") || "guest";
    const updatedRatings = {
      ...ratings,
      [carId]: { ...ratings[carId], [userId]: rating },
    };

    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  // 🔹 Average rating
  const getAverageRating = (carId) => {
    const carRatings = ratings[carId];
    if (!carRatings) return 0;
    const values = Object.values(carRatings);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  };

  // 🔹 Book car + award points
  const handleBookNow = (car) => {
    dispatch(setCar(car));
    const newPoints = loyaltyPoints + 50;
    setLoyaltyPoints(newPoints);
    localStorage.setItem("loyaltyPoints", newPoints);
    navigate("/booking");
  };

  // 🔹 Filter cars by search term
  const filteredCars = cars.filter(
    (car) =>
      car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 🔹 Error
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🚘 Available Cars</h1>

        {userRole === "agency" && (
          <div className="flex flex-wrap gap-3">
            <Link
              to="/agencydashboard"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Dashboard
            </Link>

            <Link
              to="/issuemanagement"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Issues
            </Link>
            <Link
              to="/booking-status"
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              Booking Status
            </Link>

          </div>
        )}
      </div>

      {/* Car List */}
      {filteredCars.length === 0 ? (
        <p className="text-gray-500">No cars found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id || car.name}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={car.image || "https://via.placeholder.com/300"}
                alt={car.name || "Car"}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {car.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  Color: {car.color || "Unknown"}
                </p>
                <p className="text-blue-700 font-bold mt-1">₹{car.price}</p>

                {/* ⭐ Ratings */}
                <div className="mt-2">
                  <p className="text-yellow-600 font-medium">
                    ⭐ {getAverageRating(car.id)} / 5
                  </p>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(car.id, star)}
                        className="text-yellow-500 hover:scale-110 transition"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* 🎁 Loyalty Progress */}
                <div className="mt-3">
                  <p className="text-sm text-green-600 font-medium">
                    🎁 Loyalty Points: {loyaltyPoints} / 100
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{
                        width: `${Math.min(loyaltyPoints % 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  {loyaltyPoints >= 100 && (
                    <p className="text-xs text-green-700 mt-1">
                      ✅ You unlocked ₹200 discount!
                    </p>
                  )}
                </div>

                {/* Actions */}
                {userRole === "individual" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleBookNow(car)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => setQuickViewCar(car)}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                    >
                      Quick View
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    {/* Quick View Modal */}
{quickViewCar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setQuickViewCar(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      {/* Car Info */}
      <h2 className="text-2xl font-bold mb-4">{quickViewCar.name}</h2>
      <img
        src={quickViewCar.image || "https://via.placeholder.com/400"}
        alt={quickViewCar.name}
        className="w-full h-48 object-cover rounded"
      />
      <p className="mt-2 text-gray-600">Color: {quickViewCar.color}</p>
      <p className="text-blue-700 font-bold mt-1">₹{quickViewCar.price}</p>
      <p className="mt-2">⭐ {getAverageRating(quickViewCar.id)} / 5</p>

      {/* 🔹 Car Features */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Car Features</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
          <li>{quickViewCar.features?.seats || "5 Seater"}</li>
          <li>{quickViewCar.features?.fuel || "Petrol / Diesel"}</li>
          <li>{quickViewCar.features?.transmission || "Manual / Automatic"}</li>
          <li>{quickViewCar.features?.mileage || "15 km/l approx"}</li>
        </ul>
      </div>

      {/* 🔹 Car Description */}
      {quickViewCar.description && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 mt-1">{quickViewCar.description}</p>
        </div>
      )}

      {/* Report Issue */}
      <Link
        to="/report-issue"
        className="w-full mt-4 block text-center bg-red-500 text-white py-2 rounded hover:bg-red-600"
        onClick={() => setQuickViewCar(null)} // close modal when navigating
      >
        Report Issue
      </Link>
    </div>
  </div>
)}

    </div>
  );
}

export default Cars;
