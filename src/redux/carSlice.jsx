// redux/carSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const carSlice = createSlice({
  name: "selectedCar",
  initialState,
  reducers: {
    setCar: (state, action) => action.payload,
  },
});

export const { setCar } = carSlice.actions;
export default carSlice.reducer;
