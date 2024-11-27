import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types based on the API response
interface MealOption {
  code: string;
  desc: string;
}

interface FareDetails {
  TAF: number;
  NF: number;
  BF: number;
  TF: number;
}

interface AdditionalFareDetails {
  OT: number;
  YR: number;
  MU: number;
}

interface FareInfo {
  fareIdentifier: string;
  id: string;
  totalFareDetail: FareDetails;
  additionalFareDetail: AdditionalFareDetails;
}

interface FlightSegment {
  id: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  duration: number;
  stops: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  ssrInfo: MealOption[];
}

interface TripInfo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sI: any;
  segments: FlightSegment[];
  totalPriceList: FareInfo[];
}

interface SearchQuery {
  fromCityCode: string;
  toCityCode: string;
  travelDate: string;
}

interface TripState {
  tripInfos: TripInfo[];
  searchQuery: SearchQuery;
  totalPriceInfo: FareInfo;
  st: number;  // Add 'st' field here
  errors: string;
}

const initialState: TripState = {
  tripInfos: [],
  searchQuery: {
    fromCityCode: '',
    toCityCode: '',
    travelDate: ''
  },
  totalPriceInfo: {
    fareIdentifier: '',
    id: '',
    totalFareDetail: {
      TAF: 0,
      NF: 0,
      BF: 0,
      TF: 0
    },
    additionalFareDetail: {
      OT: 0,
      YR: 0,
      MU: 0
    }
  },
  st: 0,  // Initialize 'st' to 0
  errors: ''
};

// Create a new slice for managing the trip details state
const tripSlice = createSlice({
  name: 'tripPayload',
  initialState,
  reducers: {
    setTripInfos: (state, action: PayloadAction<TripInfo[]>) => {
      state.tripInfos = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<SearchQuery>) => {
      state.searchQuery = action.payload;
    },
    setTotalPriceInfo: (state, action: PayloadAction<FareInfo>) => {
      state.totalPriceInfo = action.payload;
    },
    setSt: (state, action: PayloadAction<number>) => {  // Action to set 'st'
      state.st = action.payload;
    },
    setErrorCode: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    resetTripState: () => {
      return initialState;
    }
  }
});

// Export the actions and reducer
export const {
  setTripInfos,
  setSearchQuery,
  setTotalPriceInfo,
  setSt,  
  setErrorCode,
  resetTripState
} = tripSlice.actions;

const tripDetailsReducer = tripSlice.reducer;
export default tripDetailsReducer;
