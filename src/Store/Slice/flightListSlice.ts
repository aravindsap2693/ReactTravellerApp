/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "../../Interfaces/models/common.model";
import { Flight } from "../../Interfaces/UI/flightList";


const initialState: InitialStateProps = {
  loading: false,
  data: null,
  onwardFlights: null,
  returnFlights: null,
  error: null,
  dynamicFilters: null,
  // twoWayDynamicFilters:null,
  formattedData: null,
  twoWayDynamicFilters: undefined
};

const flightListSlice = createSlice({
  name: "flightList",
  initialState,
  reducers: {
    fetchFlightListStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error when starting a new fetch
    },
    fetchFlightListSuccess: (state, action: PayloadAction<{ onwardFlights: Flight[], returnFlights: Flight[] }>) => {
      state.data= action.payload;
      // state.onwardFlights = action.payload.onwardFlights;
      // state.returnFlights = action.payload.returnFlights;
      state.loading = false;
    },
    fetchFlightListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      // state.onwardFlights = null;
      // state.returnFlights = null;
      state.error = action.payload;
    },
    fetchDynamicApiSuccess: (state, action: PayloadAction<any>) => {
      const filters = action.payload;
      state.dynamicFilters = filters;
      // state.twoWayDynamicFilters = filters;
    },
    
    fetchFilterFlightListSuccess: (state, action: any) => {
      state.formattedData = action.payload;
    },
  },
});

export const {
  fetchFlightListStart,
  fetchFlightListSuccess,
  fetchFlightListFailure,
  fetchDynamicApiSuccess,
  fetchFilterFlightListSuccess,
} = flightListSlice.actions;

export default flightListSlice.reducer;