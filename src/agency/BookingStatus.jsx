import { useSelector, useDispatch } from "react-redux";
import { updateBookingStatus, deleteBooking, updateBookingLocation } from "../redux/bookingSlice";

function BookingStatus() {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(id));
    }
  };

  const handleUpdateLocation = (id) => {
    const lat = prompt("Enter latitude:");
    const lng = prompt("Enter longitude:");
    if (lat && lng) {
      dispatch(updateBookingLocation({ id, location: { lat: parseFloat(lat), lng: parseFloat(lng) } }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="border p-4 rounded mb-4 bg-white">
            <p className="font-bold">{b.car?.name}</p>
            <p>User: {b.fullName}</p>
            <p>
              Dates: {b.startDate} → {b.endDate}
            </p>
            <p>
              Status: <span className="text-blue-600">{b.status}</span>
            </p>
            {b.location && (
              <p>📍 Location: {b.location.lat}, {b.location.lng}</p>
            )}
            <div className="mt-2 flex gap-2 flex-wrap">
              <button
                onClick={() => handleStatusChange(b.id, "Approved")}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(b.id, "Rejected")}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusChange(b.id, "Completed")}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Complete
              </button>
              <button
                onClick={() => handleUpdateLocation(b.id)}
                className="px-3 py-1 bg-purple-600 text-white rounded"
              >
                Update Location
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="px-3 py-1 bg-black text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookingStatus;
