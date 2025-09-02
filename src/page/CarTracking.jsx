import { useSelector } from "react-redux";

function CarTracking() {
  const bookings = useSelector((state) => state.booking.bookings);

  // Assume user only tracks their first active booking
  const activeBooking = bookings.find((b) => b.status === "Approved");

  if (!activeBooking) {
    return <p className="p-6 text-red-500">No active booking found.</p>;
  }

  if (!activeBooking.location) {
    return <p className="p-6">Agency has not shared the car location yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Tracking</h1>
      <p>Car: {activeBooking.car?.name}</p>
      <p>📍 Current Location:</p>
      <iframe
        title="car-location"
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${activeBooking.location.lat},${activeBooking.location.lng}&zoom=14`}
      ></iframe>
    </div>
  );
}

export default CarTracking;
