import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  flightId: string | null;
}

const initialState: BookingState = {
  flightId: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFlightId: (state, action: PayloadAction<string>) => {
      state.flightId = action.payload;
    },
    clearFlightId: (state) => {
      state.flightId = null;
    },
  },
});

export const { setFlightId, clearFlightId } = bookingSlice.actions;
export default bookingSlice.reducer;
