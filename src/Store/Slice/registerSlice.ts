/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "../../Interfaces/models/common.model";

const initialState: InitialStateProps = {
  loading: false,
  data: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    fetchRegisterStart: (state) => {
      state.loading = true;
    },
    fetchRegisterSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchRegisterFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRegisterStart,
  fetchRegisterSuccess,
  fetchRegisterFailure,
} = registerSlice.actions;

const registerReducer = registerSlice.reducer;

export default registerReducer;
