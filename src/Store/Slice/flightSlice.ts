import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlightState {
  flightType: string | null;
}

const initialState: FlightState = {
  flightType: "One Way", // Initial state value
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlightType: (state, action: PayloadAction<string | null>) => {
      state.flightType = action.payload;
    },
  },
});

export const { setFlightType } = flightSlice.actions;
export default flightSlice.reducer;
