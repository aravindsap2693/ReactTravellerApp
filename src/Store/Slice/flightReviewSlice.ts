import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { InitialStateProps } from "../../Interfaces/models/common.model";
interface Flight {
  airline: string;
  icon: string;
  departure: string;
  departureLocation: string;
  duration: string;
  durationDetails: string;
  arrival: string;
  arrivalLocation: string;
  class: string;
  minprice: string;
  seats: number;
  pricingOptions: PricingOption[];
}
interface PricingOption {
  id: string;
  fare: number;
  code: string;
  seats: number;
  class: string;
  price: number;
  netfare: number;
  breakdown: {
    baseFare: number;
    adultFare: number;
    taxAndCharges: number;
    userDevelopmentFee: number;
    k3Tax: number;
    airlineMisc: number;
  };
}
const initialReviewState: InitialStateProps = {
  loading: false,
  data: null,
  error: null,
};
const flightReviewSlice = createSlice({
  name: "flightReview",
  initialState: initialReviewState,
  reducers: {
    fetchFlightReviewStart: (state) => {
      state.loading = true;
    },
    fetchFlightReviewSuccess: (state, action: PayloadAction<Flight[]>) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchFlightReviewFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
// Export actions
export const {
  fetchFlightReviewStart,
  fetchFlightReviewSuccess,
  fetchFlightReviewFailure,
} = flightReviewSlice.actions;


export const FlightReviewReducer = flightReviewSlice.actions;

// Export reducer
export default flightReviewSlice.reducer;
// Thunk to fetch flight reviews
export const fetchFlightReviews = (priceId: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchFlightReviewStart());
  try {
    const response = await fetch('https://traveller.mroot.in/backend/api/v1/flight/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceIds: [priceId] }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const mappedReviews = mapFlightData(data.data.payload.tripInfos);
    dispatch(fetchFlightReviewSuccess(mappedReviews));
  } catch (error) {
    dispatch(fetchFlightReviewFailure((error as Error).message));
  }
};
// Function to map flight data
export const mapFlightData = (tripInfos: any[]): Flight[] => {
  return tripInfos.flatMap((tripInfo: any) => {
    return tripInfo.sI.map((segment: any, index: number) => {
      const priceInfo = tripInfo.totalPriceList[index];
      const fareDetails = priceInfo?.fd?.ADULT?.fC;
      const additionalFareDetails = priceInfo?.fd?.ADULT?.afC?.TAF;
      if (!fareDetails || !additionalFareDetails) {
        console.error("Fare details missing for this priceInfo:", priceInfo);
        return null;
      }
      const pricingOptions = tripInfo.totalPriceList.map((price: any) => ({
        id: price.id,
        fare: price.fd.ADULT.fC.TF,
        code: price.fd.ADULT.fC.code,
        seats: price.fd.ADULT.sR,
        class: price.fd.ADULT.cc,
        price: price.fd.ADULT.fC.TF,
        netfare: price.fd.ADULT.fC.NF,
        breakdown: {
          baseFare: price.fd.ADULT.fC.BF,
          adultFare: price.fd.ADULT.fC.TAF,
          taxAndCharges: price.fd.ADULT.fC.AGST,
          userDevelopmentFee: price.fd.ADULT.fC.MU,
          k3Tax: price.fd.ADULT.fC.OT,
          airlineMisc: price.fd.ADULT.fC.YQ,
        },
      }));
      return {
        airline: segment.fD?.aI?.name || 'Unknown Airline',
        icon: `/path/to/airline-icons/${segment.fD?.aI?.code}.png`,
        departure: new Date(segment.dt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        departureLocation: `${segment.da?.name} (${segment.da?.code})`,
        duration: `${Math.floor(segment.duration / 60)}h ${segment.duration % 60}m`,
        durationDetails: segment.stops === 0 ? 'Non Stop' : `${segment.stops} Stop`,
        arrival: new Date(segment.at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        arrivalLocation: `${segment.aa?.name} (${segment.aa?.code})`,
        class: priceInfo.fd.ADULT?.cc || 'Unknown Class',
        minprice: `₹${priceInfo.fd.ADULT.fC.TF || 0}`,
        seats: segment.sN || 0,
        pricingOptions,
      };
    }).filter(Boolean);
  });
};