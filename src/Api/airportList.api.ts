/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchAirportListStart,
  fetchAirportListSuccess,
  fetchAirportListFailure,
} from "../Store/Slice/airportListSlice";
import env from "./Services/api";

export const fetchAirportList = (payload: any) => async (dispatch: any) => {
  dispatch(fetchAirportListStart()); 
  try {
    const data = await env.post(`v1/air/search`, payload); 
    dispatch(fetchAirportListSuccess(data));
    return data;
  } catch (error: any) {
    console.error(error);
    dispatch(fetchAirportListFailure(error)); 
    return error;
  }
};
