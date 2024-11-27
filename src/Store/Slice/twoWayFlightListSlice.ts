/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "../../Interfaces/UI/flightList";
import { InitialStateRoundTripProps } from "../../Interfaces/models/common.model";


const initialState: InitialStateRoundTripProps = {
  loading: false,
  data: null,
  onwardFlights: null,
  returnFlights: null,
  comboFlights: null,
  error: null,
  dynamicFilters: null,
  twoWayDynamicFilters: null,
  formattedOnwardData: null,
  formattedReturnData: null,
};

const flightListSlice = createSlice({
  name: "twoWayFlightList",
  initialState,
  reducers: {
    fetchTwoWayFlightListStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error when starting a new fetch
    },
    fetchTwoWayFlightListSuccess: (state, action: PayloadAction<{ onwardFlights: Flight[], returnFlights: Flight[],comboFlights:Flight[] }>) => {
      state.data= action.payload;
      state.onwardFlights = action.payload.onwardFlights;
      state.returnFlights = action.payload.returnFlights;
      state.comboFlights =  action.payload.comboFlights;
      state.loading = false;
    },
    fetchTwoWayFlightListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.onwardFlights = null;
      state.returnFlights = null;
      state.comboFlights = null;
      state.error = action.payload;
    },
    fetchTwoWayDynamicApiSuccess: (state, action: PayloadAction<any>) => {
      const filters = action.payload;
      state.dynamicFilters = filters;
      state.twoWayDynamicFilters = filters;
    },
    
    fetchTwoWayFilterFlightListSuccess: (state, action: PayloadAction<any>) => {
      state.formattedOnwardData = action.payload;
    },
    
    fetchTwoWayFilterFlightListReturnSuccess: (state, action: PayloadAction<any>) => {
      state.formattedReturnData = action.payload;
  },
}
});

export const {
  fetchTwoWayFlightListStart,
  fetchTwoWayFlightListSuccess,
  fetchTwoWayFlightListFailure,
  fetchTwoWayDynamicApiSuccess,
  fetchTwoWayFilterFlightListSuccess,
  fetchTwoWayFilterFlightListReturnSuccess
} = flightListSlice.actions;
const twoWayFlightData = flightListSlice.reducer;
export default twoWayFlightData