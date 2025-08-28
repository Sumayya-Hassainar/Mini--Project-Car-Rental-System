import React, { useState } from "react";
import { useSelector } from "react-redux";

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

  if (!selectedCar)
    return <p className="p-6 text-red-500">Please select a car first!</p>;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { fullName, email, phone, startDate, endDate, paymentMethod } = formData;

    if (!fullName || !email || !phone || !startDate || !endDate || !paymentMethod) {
      alert("Please fill all fields!");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    // Date validation
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    alert(
      `Booking confirmed for ${selectedCar.name} from ${formData.startDate} to ${formData.endDate}`
    );
    console.log("Booking Data:", { ...formData, car: selectedCar });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Booking Form</h1>

      {/* Selected Car Info */}
      <div className="flex gap-4 mb-6 bg-white p-4 rounded shadow">
        <img
          src={selectedCar.image || "https://via.placeholder.com/150"}
          alt={selectedCar.name}
          className="w-40 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-semibold">{selectedCar.name}</h2>
          <p>Color: {selectedCar.color}</p>
          <p className="font-bold">₹{selectedCar.price}</p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <label className="block font-medium mb-1">Full Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <label className="block font-medium mb-1">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <label className="block font-medium mb-1">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <div className="flex gap-4">
          <label className="block font-medium mb-1">Starting:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <label className="block font-medium mb-1">Ending:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>
        <label className="block font-medium mb-1">Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash On Pay</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
