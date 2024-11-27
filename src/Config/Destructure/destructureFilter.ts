// Function to map dynamic filters
export const mapDynamicFilters = (filters: any) => {
    return {
      fareIdentifiers: filters?.ONWARD.istOfFareIdentifiers || [],
      airlines: filters?.ONWARD.listOfAirLines || [],
      cabinClasses: filters?.ONWARD.listOfCabinClasses || [],
      fares: filters?.ONWARD.listOfFares || [],
      stops: filters?.ONWARD.noOfStops || [],
      stopoverAirports: filters?.ONWARD.stopOverAirports || [],
      durations: filters?.ONWARD.totalDuration || [],
      travelDates: filters?.ONWARD.travelDateAndTime || [],
    };
  };
  


  export const mapTwoDynamicFilters = (filters: any) => {
    return {
      onward: {
        fareIdentifiers: filters?.ONWARD.istOfFareIdentifiers || [],
        airlines: filters?.ONWARD.listOfAirLines || [],
        cabinClasses: filters?.ONWARD.listOfCabinClasses || [],
        fares: filters?.ONWARD.listOfFares || [],
        stops: filters?.ONWARD.noOfStops || [],
        stopoverAirports: filters?.ONWARD.stopOverAirports || [],
        durations: filters?.ONWARD.totalDuration || [],
        travelDates: filters?.ONWARD.DepartureTimes || [],
        arrivalDates: filters?.ONWARD.ArrivalTimes || []
      },
      return: {
        fareIdentifiers: filters?.RETURN.istOfFareIdentifiers || [],
        airlines: filters?.RETURN.listOfAirLines || [],
        cabinClasses: filters?.RETURN.listOfCabinClasses || [],
        fares: filters?.RETURN.listOfFares || [],
        stops: filters?.RETURN.noOfStops || [],
        stopoverAirports: filters?.RETURN.stopOverAirports || [],
        durations: filters?.RETURN.totalDuration || [],
        travelDates: filters?.RETURN.DepartureTimes || [],
        arrivalDates: filters?.RETURN.ArrivalTimes || []
      }
    };
  };
  

  // Function to map dynamic filters
// export const mapDynamicFilters = (filters: {
//     checkedOptions: Map<string, string>;
//     checkedFareTypes: string[];
//   }) => {
//     const fareIdentifiers = Array.from(filters.checkedOptions.values()).filter((option) => option === 'fareTypeIdentifier'); // Replace with actual condition if needed
//     const airlines = Array.from(filters.checkedOptions.keys()).filter((key) => key === 'airline'); // Replace with actual condition
//     const cabinClasses = filters.checkedFareTypes.filter((type) => type === 'cabinClass'); // Replace with actual condition
//     const fares = []; // Populate based on checked fare types or other criteria
//     const stops = filters.checkedOptions.get('stops') ? [filters.checkedOptions.get('stops')] : []; // Assuming 'stops' can have a single value
//     const stopoverAirports = []; // Populate based on relevant checked options
//     const durations = []; // Populate based on durations or other criteria
//     const travelDates = []; // Populate based on relevant travel dates or other criteria
  
//     return {
//       fareIdentifiers,
//       airlines,
//       cabinClasses,
//       fares,
//       stops,
//       stopoverAirports,
//       durations,
//       travelDates,
//     };
//   };
  