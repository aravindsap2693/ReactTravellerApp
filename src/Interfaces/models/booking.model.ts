/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TravellerInfo {
  title: string;
  lastName: string;
  firstName: string;
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
export interface SsrInfo {
  key: string;
  code: string;
}

export interface PaymentInfo {
  amount: number;
}

export interface GstInfo {
  gstNumber: string;
  email: string;
  registeredName: string;
  mobile: string;
  address: string;
}

export interface DeliveryInfo {
  mobile_number?: any;
  email_id?: any;
  emails?: string[];
  contacts?: string[];
}

// Define the initial state with types
export interface BookingState {
  bookingId: string;
  totalAmount: number;
  paymentInfos: PaymentInfo[];
  travellerInfo: TravellerInfo[];
  gstInfo: GstInfo;
  contactInfo: DeliveryInfo;
  errors: string;
}
