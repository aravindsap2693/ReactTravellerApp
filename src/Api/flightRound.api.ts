/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch} from "../Store/store";
import { mapFlightData } from "../Config/Destructure/destructureData";
import env from "./Services/api";
import {  mapTwoDynamicFilters } from "../Config/Destructure/destructureFilter";
import { fetchTwoWayDynamicApiSuccess, fetchTwoWayFlightListFailure, fetchTwoWayFlightListStart, fetchTwoWayFlightListSuccess } from "../Store/Slice/twoWayFlightListSlice";


export const fetchRoundTripListFlights = (payload: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchTwoWayFlightListStart());
  try {
    const response = await env.post('v1/booking/search?agent=2&partner=1', payload);
    const onwardFlights = response?.response?.searchResult?.tripInfos?.ONWARD || [];
    const returnFlights = response?.response?.searchResult?.tripInfos?.RETURN || [];
    const comboFlights = response?.response?.searchResult?.tripInfos?.COMBO || [];
    const dynamicFilters = response?.dynamicFilters || null;

    const mappedOnwardFlights = onwardFlights.map((flightData: any) => mapFlightData(flightData));
    const mappedReturnFlights = returnFlights.map((flightData: any) => mapFlightData(flightData));
    const mappedComboFlights = comboFlights.map((flightData: any) => mapFlightData(flightData));
    
    dispatch(fetchTwoWayFlightListSuccess({
      onwardFlights: mappedOnwardFlights.flat(),
      returnFlights: mappedReturnFlights.flat(),
      comboFlights: mappedComboFlights.flat(),
    }));

    if (dynamicFilters && onwardFlights?.length && returnFlights?.length && !comboFlights?.length) {
      const mappedFilters = mapTwoDynamicFilters(dynamicFilters);
      dispatch(fetchTwoWayDynamicApiSuccess(mappedFilters));
    }

  } catch (error) {
    console.error("Error fetching flight list:", error);
    dispatch(fetchTwoWayFlightListFailure((error as Error).message));
  }
};