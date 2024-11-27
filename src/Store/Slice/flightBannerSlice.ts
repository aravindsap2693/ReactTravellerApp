import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flightType: '',  
    departure: { name: '', code: '' },          
    destination: { name: '', code: '' },        
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

const flightBannerSlice = createSlice({
    name: 'flightBanner',
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
        setCabinClass : (state , action) =>{
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
        resetFlightState: (state) => {
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
} = flightBannerSlice.actions;

const flightBannerDetails = flightBannerSlice.reducer;
export default flightBannerDetails;