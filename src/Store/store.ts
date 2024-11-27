import { configureStore, Reducer, AnyAction } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
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
import tripDetailsReducer from "./Slice/tripDataSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk, ThunkAction } from "redux-thunk";
// import { createLogger } from "redux-logger"; // Import logger
import { mealReducer } from "./Slice/mealSlice";
import { baggageReducer } from "./Slice/baggageSlice";
import fareDetailsReducer from "./Slice/fareDetailsSlice";
import seatSelectionReducer from "./Slice/seatSlice";
import twoWayFlightData from "./Slice/twoWayFlightListSlice";
import roundTripFlightDetails from "./Slice/roundTripSelectedFlightDetailsSlice";
import flightMulticitySlice from "./Slice/flightMulticitySlice";

const persistConfig = {
  key: "root",
  storage,
};

// Action type to reset the Redux state
const RESET_ACTION = "RESET";

// Root reducer using combineReducers
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
  tripData: tripDetailsReducer,
  meal: mealReducer,
  baggage: baggageReducer,
  fareDetails: fareDetailsReducer,
  seatSelection: seatSelectionReducer,
  twoWayFlightListData: twoWayFlightData,
  roundTripSelectedFlightDetails: roundTripFlightDetails,
  flightMulticitySlice: flightMulticitySlice,
});

// Wrapper reducer to handle RESET_ACTION
const appReducer: Reducer<ReturnType<typeof rootReducer>, AnyAction> = (state, action) => {
  if (action.type === RESET_ACTION) {
    return rootReducer(undefined, action); // Reset the state to its initial values
  }
  return rootReducer(state, action); // Default behavior
};

export const persistedReducer = persistReducer(persistConfig, appReducer);

// const logger = createLogger();

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

// Function to clear store and persistent data
export const clearStore = async () => {
  store.dispatch({ type: RESET_ACTION }); // Reset Redux state
  await persistor.purge(); // Clear persisted data
  localStorage.clear();
};

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
