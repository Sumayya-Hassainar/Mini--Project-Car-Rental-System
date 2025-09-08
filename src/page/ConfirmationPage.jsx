import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  // Dummy driver details (static for demo)
  const driver = {
    name: "John Doe",
    phone: "+91 98765 43210",
    carNumber: "KL 07 AB 1234"
  };

  // ✅ Save confirmed booking
  useEffect(() => {
    if (bookingData) {
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push({ ...bookingData, driver });
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookingData]);

  if (!bookingData) return <p className="p-6 text-red-500">No booking found!</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 Booking Confirmed!
      </h1>

      {/* Booking Info */}
      <div className="space-y-2 mb-6">
        <p className="text-gray-800">Thank you, <span className="font-semibold">{bookingData.fullName}</span>!</p>
        <p className="text-gray-800">🚗 Car: {bookingData.car.name}</p>
        <p className="text-gray-800">
          📅 Duration: {bookingData.startDate} → {bookingData.endDate}
        </p>
        <p className="text-gray-800">💳 Payment Method: {bookingData.paymentMethod}</p>
        <p className="font-bold text-blue-600">✅ Status: Confirmed</p>
      </div>

      {/* Driver Info */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Driver Details</h2>
        <p>👨‍✈️ <span className="font-medium">{driver.name}</span></p>
        <p>📞 {driver.phone}</p>
        <p>🚘 Car No: {driver.carNumber}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          to="/car-tracking"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700"
        >
          Track Your Car
        </Link>

        <Link
          to="/contact"
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg text-center hover:bg-gray-300"
        >
          Need Help? Contact Support
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;
