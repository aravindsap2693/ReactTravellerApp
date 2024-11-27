/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchDynamicApiSuccess, fetchFlightListFailure, fetchFlightListStart, fetchFlightListSuccess } from "../Store/Slice/flightListSlice";
import { AppDispatch } from "../Store/store";
import { mapFlightData } from "../Config/Destructure/destructureData";
import env from "./Services/api";
import { mapDynamicFilters } from "../Config/Destructure/destructureFilter";

export const fetchListFlights = (payload: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchFlightListStart());
  try {
    const response = await env.post('v1/booking/search?agent=2&partner=1', payload);  
    console.log("response", response);
    const flights = response?.response?.searchResult?.tripInfos?.ONWARD || [];
    
    const dynamicFilters = response?.dynamicFilters || null;

    console.log("flights", flights);
    console.log("dynamicFilters", dynamicFilters);

    const mappedFlights = flights.map((flightData: any) => mapFlightData(flightData));
    dispatch(fetchFlightListSuccess(mappedFlights.flat()));


    if (dynamicFilters) {
      const mappedFilters = mapDynamicFilters(dynamicFilters);
      dispatch(fetchDynamicApiSuccess(mappedFilters));
      console.log("mappedFilters", mappedFilters);
    }

  } catch (error) {
    console.error("Error fetching flight list:", error);
    dispatch(fetchFlightListFailure((error as Error).message));
  }
};


// const onwardFlights = response?.response?.searchResult?.tripInfos?.ONWARD || [];
// console.log("onwardFlights",onwardFlights)
// const returnFlights = response?.response?.searchResult?.tripInfos?.RETURN || [];
// const dynamicFilters = response?.dynamicFilters || null;

// console.log("onwardFlights", onwardFlights);
// console.log("returnFlights", returnFlights);
// console.log("dynamicFilters", dynamicFilters);

// const mappedOnwardFlights = onwardFlights.map((flightData: any) => mapFlightData(flightData));
// const mappedReturnFlights = returnFlights.map((flightData: any) => mapFlightData(flightData));
// console.log("mappedOnwardFlights--------",mappedOnwardFlights)
// console.log("mappedReturnFlights--------",mappedReturnFlights)

// dispatch(fetchFlightListSuccess({
//   onwardFlights: mappedOnwardFlights.flat(),
//   returnFlights: mappedReturnFlights.flat(),
// }));