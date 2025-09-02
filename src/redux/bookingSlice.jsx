import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({ ...action.payload, id: Date.now(), status: "Pending", location: null });
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) booking.status = status;
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
    updateBookingLocation: (state, action) => {
      const { id, location } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) booking.location = location;
    },
  },
});

export const { addBooking, updateBookingStatus, deleteBooking, updateBookingLocation } =
  bookingSlice.actions;
export default bookingSlice.reducer;
