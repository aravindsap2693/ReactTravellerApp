// slices/stateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stateItemProps, stateListProps } from "../../Interfaces/models/state.model";


const initialState: stateListProps = {
  stateList: [],
  error: null,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // PayloadAction should accept an array of stateItemProps (list of states)
    setStateList: (state, action: PayloadAction<stateItemProps[]>) => {
      state.stateList = action.payload; 
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => { 
      state.error = action.payload;
    },
  },
});

// Export the action creators
export const { setStateList, setError } = stateSlice.actions;

// Export the reducer
const stateReducer = stateSlice.reducer;
export default stateReducer;



