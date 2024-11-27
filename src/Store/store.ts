import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./Slice/authSlice";
import stateReducer from "./Slice/stateSlice";
import cityReducer from "./Slice/citySlice";
import registerReducer from "./Slice/registerSlice";
import flightReducer from "./Slice/flightSlice";
import flightListReducer from "./Slice/flightListSlice";
import airportListReducer from "./Slice/airportListSlice";
import bookingReducer from "./Slice/bookingSlice";
import flightBannerDetails from "./Slice/flightBannerSlice";
import airportFieldReducer from "./Slice/airportFieldSlice";
import bookingDetailsReducer from "./Slice/bookingPayloadSlice";

// Create the root reducer using combineReducers
const rootReducer = combineReducers({
  auth: authReducer,
  stateList: stateReducer,
  districtList: cityReducer,
  airport: airportFieldReducer, 
  register: registerReducer,
  flight: flightReducer,
  flightList: flightListReducer,
  airportList: airportListReducer,
  booking: bookingReducer,
  flightBanner: flightBannerDetails,
  bookingPayload: bookingDetailsReducer,
});

// Configure store without persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  // Uncomment the line below to enable Redux DevTools in development
  // devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
