/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SsrInfo } from "../../Interfaces/models/booking.model";

// Define the initial state for the seat slice
const initialState:any = {
    SsrInfo : [],
    initialAmount : 0
}
 

// Create the slice for seat selection
const seatSlice = createSlice({
  name: "seatSelection",
  initialState,
  reducers: {
    setSsrSeatInfos: (state, action: PayloadAction<SsrInfo[]>) => {
      state.SsrInfo = action.payload
    },
    setSeatTotalAmount: (state, action: any) =>{
        state.initialAmount = action.payload
    },
    resetSsrSeatInfos: () => {
      return initialState;  
    },
  },
});

export const { setSsrSeatInfos, resetSsrSeatInfos, setSeatTotalAmount } = seatSlice.actions;

const seatSelectionReducer = seatSlice.reducer;
export default seatSelectionReducer;
