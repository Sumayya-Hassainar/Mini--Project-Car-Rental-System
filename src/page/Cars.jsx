import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCar } from "../redux/carSlice";
 import { Link } from "react-router-dom";

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchTerm = useSelector((state) => state.search.searchTerm)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          "https://my-json-server.typicode.com/sumayya-hassainar/api/cars"
        )
        setCars(res.data)
      } catch (err) {
        setError("Failed to load cars")
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const filteredCars = cars.filter(
    (car) =>
      car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookNow = (car) => {
    dispatch(setCar(car)); // store selected car in Redux
    navigate("/booking");
  }

  if (loading) return <p className="p-6">Loading cars...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>

      {filteredCars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
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
              <button
                onClick={() => handleBookNow(car)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
           

<Link
  to="/report-issue"
  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>
  Report Issue
</Link>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cars;
