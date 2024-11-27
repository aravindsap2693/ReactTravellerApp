import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "../../Interfaces/models/common.model";


const initialState: InitialStateProps = {
  loading: false,
  data: null,
  error: null,
};

const airportListSlice = createSlice({
  name: "AirportList",
  initialState,
  reducers: {
    fetchAirportListStart: (state) => {
      state.loading = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchAirportListSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchAirportListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  fetchAirportListStart,
  fetchAirportListSuccess,
  fetchAirportListFailure,
} = airportListSlice.actions;

// Export reducer
export default airportListSlice.reducer;
