// fareDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for fare details
interface FareDetail {
  title: string;
  value: string;
}

interface FareDetailsState {
  fareDetailsList: FareDetail[][];
}

// Initial state for fare details
const initialFareDetailsState: FareDetailsState = {
  fareDetailsList: [],
};

// Create fare details slice
const fareDetailsSlice = createSlice({
  name: "fareDetails",
  initialState: initialFareDetailsState,
  reducers: {
    setFareDetailsListt(state, action: PayloadAction<FareDetail[][]>) {
      state.fareDetailsList = action.payload;
    },
  },
});

// Export actions from fare details slice
export const { setFareDetailsListt } = fareDetailsSlice.actions;

// Export reducer
const fareDetailsReducer = fareDetailsSlice.reducer;
export default fareDetailsReducer
