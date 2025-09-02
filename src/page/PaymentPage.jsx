import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingSlice";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingData = location.state?.bookingData;

  if (!bookingData) return <p>No booking data found!</p>;

  const handlePaymentSuccess = () => {
    // Store booking in Redux after "payment"
    dispatch(addBooking({ ...bookingData, status: "Confirmed" }));

    // Redirect to confirmation page
    navigate("/confirmation", { state: { bookingData } });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <p className="mb-2">Car: {bookingData.car.name}</p>
      <p className="mb-2">Amount: ₹{bookingData.car.price}</p>
      <p className="mb-2">Payment Method: {bookingData.paymentMethod}</p>

      <button
        onClick={handlePaymentSuccess}
        className="w-full bg-green-600 text-white py-2 rounded mt-4"
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default PaymentPage;
