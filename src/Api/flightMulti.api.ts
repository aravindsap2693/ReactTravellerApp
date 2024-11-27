import { AppDispatch } from "../Store/store";
import { mapMulticityFlightData } from "../Config/Destructure/destructureData";
import env from "./Services/api";
import { mapTwoDynamicFilters } from "../Config/Destructure/destructureFilter";
import { fetchTwoWayDynamicApiSuccess, fetchTwoWayFlightListFailure, fetchTwoWayFlightListStart, fetchTwoWayFlightListSuccess } from "../Store/Slice/twoWayFlightListSlice";

export const fetchMulticityFlights = (payload: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchTwoWayFlightListStart());
  try {
    const response = await env.post('v1/booking/search?agent=2&partner=1', payload);
    const tripInfos = response?.response?.searchResult?.tripInfos || {};
    const dynamicFilters = response?.dynamicFilters || null;

    console.log("tripInfos", tripInfos);
    console.log("dynamicFilters", dynamicFilters);

    const mappedFlights = mapMulticityFlightData(tripInfos);
    console.log("mappedFlights--------", mappedFlights);

    dispatch(fetchTwoWayFlightListSuccess({
      onwardFlights: mappedFlights.flat(),
      returnFlights: [], // Assuming no return flights for multicity
    }));

    if (dynamicFilters) {
      const mappedFilters = mapTwoDynamicFilters(dynamicFilters);
      dispatch(fetchTwoWayDynamicApiSuccess(mappedFilters));
      console.log("mappedFilters", mappedFilters);
    }

  } catch (error) {
    console.error("Error fetching flight list:", error);
    dispatch(fetchTwoWayFlightListFailure((error as Error).message));
  }
};