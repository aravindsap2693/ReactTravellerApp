/* eslint-disable @typescript-eslint/no-explicit-any */

import { setBookingId } from "../Store/Slice/bookingPayloadSlice";
import { AppDispatch } from "../Store/store";
import env from "./Services/api"; 

export const reviewBooking = (payload: any) => async (dispatch: AppDispatch) => {
  try {
   
    const response = await env.post('v1/booking/review', payload);
    const data = response; 
    console.log("responde",response)
    console.log("API Response Data:", data); 
   
    if (response.ok) {
      dispatch(setBookingId(data.bookingId));
    }

    return data; 
  } catch (error) {
    console.log("API Error:", error);
    throw error; 
  }
};
