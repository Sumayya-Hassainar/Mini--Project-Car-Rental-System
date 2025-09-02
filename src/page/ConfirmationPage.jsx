import React from "react";
import { useLocation } from "react-router-dom";

function ConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  if (!bookingData) return <p>No booking found!</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed 🎉</h1>
      <p className="mb-2">Thank you, {bookingData.fullName}!</p>
      <p className="mb-2">Car: {bookingData.car.name}</p>
      <p className="mb-2">
        Duration: {bookingData.startDate} → {bookingData.endDate}
      </p>
      <p className="mb-2">Payment Method: {bookingData.paymentMethod}</p>
      <p className="font-bold text-blue-600">Status: Confirmed</p>
    </div>
  );
}

export default ConfirmationPage;
