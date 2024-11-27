/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
// import { Option } from "../../Interfaces/models/flight.model";


interface RoundTripSelectedFlightDetailsState {
  loading: boolean;
  data: any;
  error: any;
  selectedOnwardOption: any | null|any;
  selectedReturnOption: any | null|any;
}

const initialState: RoundTripSelectedFlightDetailsState = {
  loading: false,
  data: null,
  error: null,
  selectedOnwardOption: null,
  selectedReturnOption: null,
};

const registerSlice = createSlice({
  name: "roundTripSelectedFlightDetails",
  initialState,
  reducers: {
    setSelectedOnwardOption: (state, action: any) => {
      state.selectedOnwardOption = action.payload;
    },
    setSelectedReturnOption: (state, action: any) => {
      state.selectedReturnOption = action.payload;
    },
    resetSelectedOptions: (state) => {
      state.selectedOnwardOption = null;
      state.selectedReturnOption = null;
    },
  },
});

export const {
  setSelectedOnwardOption,
  setSelectedReturnOption,
  resetSelectedOptions,
} = registerSlice.actions;

const roundTripFlightDetails = registerSlice.reducer;

export default roundTripFlightDetails;