import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Booking() {
  const selectedCar = useSelector((state) => state.selectedCar);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    paymentMethod: "Credit Card",
  });

  const navigate = useNavigate();

  if (!selectedCar) {
    return <p className="p-6 text-red-500">⚠ Please select a car first!</p>;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { fullName, email, phone, startDate, endDate } = formData;
    if (!fullName || !email || !phone || !startDate || !endDate) {
      alert("Please fill all fields!");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email address!");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number! (10 digits required)");
      return false;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;


    // 👉 Redirect to payment page
    navigate("/payment", {
      state: {
        bookingData: { ...formData, car: selectedCar, status: "Pending" },
      },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Booking</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Car Info */}
        <h2 className="text-xl font-semibold mb-4">Car Details</h2>
        <div className="flex gap-4 mb-6">
          <img
            src={selectedCar.image || "https://via.placeholder.com/150"}
            alt={selectedCar.name}
            className="w-40 h-24 object-cover rounded"
          />
          <div>
            <p className="font-semibold">{selectedCar.name}</p>
            <p>Color: {selectedCar.color}</p>
            <p className="font-bold text-green-600">₹{selectedCar.price}</p>
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-lg font-semibold">Your Details</h2>
        <label>Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Booking Dates */}
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Availability Link */}
        <div className="mt-2">
          <Link
            to={`/car-availability/${selectedCar.id}`}
            className="text-blue-600 underline"
          >
            Check Availability
          </Link>
        </div>

        {/* Payment Option */}
        <label>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash on Delivery</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default Booking;

