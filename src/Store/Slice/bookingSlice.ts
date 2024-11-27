import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  flightId: string | null;
  onwardFlightId: string | null;
  returnFlightId: string | null;
}

const initialState: BookingState = {
  flightId: null,
  onwardFlightId: null,
  returnFlightId: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFlightId: (state, action: PayloadAction<string>) => {
      state.flightId = action.payload;
    },
    setOnwardFlightId: (state, action: PayloadAction<string>) => {
      state.onwardFlightId = action.payload;
    },
    setReturnFlightId: (state, action: PayloadAction<string>) => {
      state.returnFlightId = action.payload;
    },
   
    clearFlightId: (state) => {
      state.flightId = null;
      state.onwardFlightId = null;
      state.returnFlightId = null;
    },
  },
});

export const { setFlightId,setOnwardFlightId,setReturnFlightId, clearFlightId } = bookingSlice.actions;
export default bookingSlice.reducer;
