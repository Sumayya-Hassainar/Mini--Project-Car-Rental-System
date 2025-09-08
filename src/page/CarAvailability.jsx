// src/page/CarAvailability.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CarAvailability() {
  const { carId } = useParams(); // carId from URL
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    // Get past bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const carBookings = bookings.filter((b) => b.car.id === parseInt(carId));

    let dates = [];
    carBookings.forEach((b) => {
      let current = new Date(b.startDate);
      let last = new Date(b.endDate);
      while (current <= last) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });
    setBookedDates(dates);
  }, [carId]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Car Availability</h1>
      <p className="mb-2">Car ID: {carId}</p>

      {bookedDates.length > 0 ? (
        <div>
          <h2 className="font-semibold mb-2">🚫 Unavailable Dates:</h2>
          <ul className="list-disc pl-6 text-red-600">
            {bookedDates.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-green-600">✅ This car is available for all dates!</p>
      )}
    </div>
  );
}

export default CarAvailability;
