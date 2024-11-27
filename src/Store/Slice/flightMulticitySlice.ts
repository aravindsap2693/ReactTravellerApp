/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flightType: 'Multi City',
    departure: { name: '', code: '', city: '' },
    destination: { name: '', code: '', city: '' },
    departureDate: "",
    returnDate: "",
    passengers: {
        adults: 1,
        children: 0,
        infants: 0,
    },
    totalPassengers: 1,
    cabinClass: "Economy",
    loading: false,
    flightOption: "",
};

const flightMulticitySlice = createSlice({
    name: 'flightMulticity',
    initialState,
    reducers: {
        setFlightTypeData: (state, action) => {
            state.flightType = action.payload;
        },
        setDeparture: (state, action) => {
            state.departure = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setDepartureDates: (state, action) => {
            state.departureDate = action.payload;
        },
        setReturnDates: (state, action) => {
            state.returnDate = action.payload;
        },
        setCabinClass: (state, action) => {
            state.cabinClass = action.payload;
        },
        setPassengers: (state, action) => {
            state.passengers = action.payload;
            // Update totalPassengers when passengers are updated
            const { adults, children, infants } = action.payload;
            state.totalPassengers = adults + children + infants;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setFlightOption: (state, action) => {
            state.flightOption = action.payload;
        },
        // setSelectedAirlines: (state, action) => {  
        //     state.selectedAirlines = action.payload;
        // },
        resetFlightState: (_state) => {
            return initialState;
        }
    },
});

export const {
    setFlightTypeData,
    setDeparture,
    setDestination,
    setDepartureDates,
    setReturnDates,
    setPassengers,
    setFlightOption,
    setCabinClass,
    setLoading,
    resetFlightState,
} = flightMulticitySlice.actions;

const flightmulticityDetails = flightMulticitySlice.reducer;
export default flightmulticityDetails;