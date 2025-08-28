import { configureStore,  } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import carReducer from "./carSlice"
export const store = configureStore({
  reducer: {
    selectedCar:carReducer,
    search: searchReducer
  }
});
