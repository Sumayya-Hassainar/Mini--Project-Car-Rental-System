
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import carReducer from "./carSlice";
import issueReducer from "./issueSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    selectedCar: carReducer,
    search: searchReducer,
    issues: issueReducer,
    booking: bookingReducer,
  },
});
