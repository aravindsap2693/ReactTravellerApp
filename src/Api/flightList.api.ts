/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchFlightListFailure, fetchFlightListStart, fetchFlightListSuccess } from "../Store/Slice/flightListSlice";
import { AppDispatch } from "../Store/store";
import { mapFlightData } from "../Config/Destructure/destructureData";
import env from "./Services/api";

// Fetch flight list data
export const fetchListFlights = (payload: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchFlightListStart());
  try {
    const response = await env.post('v1/booking/search', payload);  
    const data = response; 
    const flights = data.searchResult.tripInfos.ONWARD;
    const mappedFlights = flights.map((flightData: any) => mapFlightData(flightData));
    dispatch(fetchFlightListSuccess(mappedFlights.flat()));
  } catch (error) {
    dispatch(fetchFlightListFailure((error as Error).message));
  }
};