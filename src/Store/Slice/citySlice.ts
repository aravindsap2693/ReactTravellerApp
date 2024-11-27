// slices/citySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  cityItemProps,
  CityListProps,
} from "../../Interfaces/models/city.model";

const initialState: CityListProps = {
  data: [],
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityList: (city, action: PayloadAction<cityItemProps[]>) => {
      city.data = action.payload;
      city.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCityList, setError } = citySlice.actions;
const cityReducer = citySlice.reducer;
export default cityReducer;
