/* eslint-disable @typescript-eslint/no-explicit-any */

import { setAirportList } from "../Store/Slice/airportFieldSlice";
import env from "./Services/api";

export const fetchFlightFieldListData = async (payload: any, dispatch: any)  => {
  try {
    const data = await env.get(`v1/airport/search?searchTerm=${payload}`);
    console.log("fetchFlightFieldListData",data)
    dispatch(setAirportList(data));
    return data;
  } catch (error: any) {
    console.error("Error fetching assets: ", error);
  }
};