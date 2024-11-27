import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for each part of the state
interface SsrInfo {
  key: string;
  code: string;
}

interface TravellerInfo {
  ti: string; 
  fN: string; 
  lN: string; 
  pt: string; 
  dob: string; 
  pid: string; 
  pNat: string; 
  pNum: string; 
  eD: string; 
  ssrBaggageInfos: SsrInfo[];
  ssrMealInfos: SsrInfo[];
  ssrSeatInfos: SsrInfo[];
  mobile: string;    
  email: string;     
  aadharNumber: string;    
}

interface PaymentInfo {
  amount: number;
}

interface GstInfo {
  gstNumber: string;
  email: string;
  registeredName: string;
  mobile: string;
  address: string;
}

interface DeliveryInfo {
  emails: string[];
  contacts: string[];
}

// Define the initial state with types
interface BookingState {
  bookingId: string;
  paymentInfos: PaymentInfo[];
  travellerInfo: TravellerInfo[];
  gstInfo: GstInfo;
  contactInfo: DeliveryInfo;
  errors : string;
}

const initialState: BookingState = {
  bookingId: '',
  paymentInfos: [],
  travellerInfo: [],
  gstInfo: {
    gstNumber: '',
    email: '',
    registeredName: '',
    mobile: '',
    address: '',
  },
  contactInfo: {
    emails: [],
    contacts: [],
  },
  errors : '',
};

const bookingSlice = createSlice({
  name: 'bookingPayload',
  initialState,
  reducers: {
    setBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    setErrorCode: (state, action: PayloadAction<string>) => {
      state.errors = action.payload; 
    },
    setPaymentInfos: (state, action: PayloadAction<PaymentInfo[]>) => {
      state.paymentInfos = action.payload;
    },
    addTravellerInfo: (state, action: PayloadAction<TravellerInfo>) => {
      state.travellerInfo.push(action.payload);
    },
    updateTravellerInfo: (
      state,
      action: PayloadAction<{ index: number; travellerData: TravellerInfo }>
    ) => {
      const { index, travellerData } = action.payload;
      if (state.travellerInfo[index]) {
        state.travellerInfo[index] = travellerData;
      }
    },
    setGstInfo: (state, action: PayloadAction<GstInfo>) => {
      state.gstInfo = action.payload;
    },
    setContactInfo: (state, action: PayloadAction<DeliveryInfo>) => {
      state.contactInfo = action.payload;
    },
    resetBookingState: () => {
      return initialState;
    },
  },
});

export const {
  setBookingId,
  setErrorCode,
  setPaymentInfos,
  addTravellerInfo,
  updateTravellerInfo,
  setGstInfo,
  setContactInfo,
  resetBookingState,
} = bookingSlice.actions;

const bookingDetailsReducer = bookingSlice.reducer
export default bookingDetailsReducer;
