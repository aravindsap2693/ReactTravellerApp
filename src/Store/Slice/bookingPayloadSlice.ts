import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BookingState,
  DeliveryInfo,
  GstInfo,
  PaymentInfo,
  TravellerInfo,
} from "../../Interfaces/models/booking.model";

// Define the types for each part of the state
const initialState: BookingState = {
  bookingId: "",
  totalAmount: 0,
  paymentInfos: [],
  travellerInfo: [],
  gstInfo: {
    gstNumber: "",
    email: "",
    registeredName: "",
    mobile: "",
    address: "",
  },
  contactInfo: {
    emails: [],
    contacts: [],
  },
  errors: "",
};

const bookingSlice = createSlice({
  name: "bookingPayload",
  initialState,
  reducers: {
    setBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    setErrorCode: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    setPaymentInfos: (state, action: PayloadAction<PaymentInfo[]>) => {
      state.paymentInfos = action.payload;
    },
    addTravellerInfo: (state, action: PayloadAction<TravellerInfo[]>) => {
      state.travellerInfo = action.payload;
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
  setTotalAmount,
  setErrorCode,
  setPaymentInfos,
  addTravellerInfo,
  setGstInfo,
  setContactInfo,
  resetBookingState,
} = bookingSlice.actions;

const bookingDetailsReducer = bookingSlice.reducer;
export default bookingDetailsReducer;
