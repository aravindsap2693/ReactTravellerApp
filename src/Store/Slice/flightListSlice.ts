import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "../../Interfaces/models/common.model";

const initialState: InitialStateProps = {
  loading: false,
  data: null,
  error: null,
};

const flightListSlice = createSlice({
  name: "flightList",
  initialState,
  reducers: {
    fetchFlightListStart: (state) => {
      state.loading = true;
    },
    fetchFlightListSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchFlightListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});


export const {
  fetchFlightListStart,
  fetchFlightListSuccess,
  fetchFlightListFailure,
} = flightListSlice.actions;

export default flightListSlice.reducer;