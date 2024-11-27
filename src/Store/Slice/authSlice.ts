import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../Interfaces/models/login.model";

const initialState: AuthState = {
  loading: true,
  isAuthenticated: false,
  token: null,
  data: null,
  error: null,
  isLogedin: undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchLoginStart: (state) => {
      state.loading = true;
    },
    fetchLoginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.data = action.payload;
      state.error = null;
    },
    fetchLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchLogoutStart: (state) => {
      state.loading = true;
    },
    fetchLogoutSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.data = action.payload;
      state.error = null;
    },
    fetchLogoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLoginStart,
  fetchLoginFailure,
  fetchLoginSuccess,
  fetchLogoutStart,
  fetchLogoutFailure,
  fetchLogoutSuccess,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
