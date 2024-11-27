import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { airportItemProps, airportListProps } from "../../Interfaces/models/flightField.model";


const initialState: airportListProps = {
  data: [],
  error: null,
 
};

const airportFieldSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    setAirportList: (state, action: PayloadAction<airportItemProps[]>) => {
      state.data = action.payload;
      state.error = null;
     
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
     
    },
 
  },
});

export const { setAirportList, setError} = airportFieldSlice.actions;

const airportFieldReducer = airportFieldSlice.reducer;

export default airportFieldReducer;
