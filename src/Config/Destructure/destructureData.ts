// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Flight } from "../../Interfaces/UI/flightList";

// // Function to map flight data to the required structure
// export const mapFlightData = (flightData: any): Flight[] => {
//     const prices = flightData.totalPriceList || [];
//     const segments = flightData.sI || [];

//     const mappedSeg = segments.map((segment: any, index: number) => ({
//       airline: segment.fD?.aI?.name || 'Unknown Airline',
//       icon: `/path/to/airline-icons/${segment.fD?.aI?.code}.png`,
//       departure: new Date(segment.dt).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       }),
//       departureLocation: `${segment.da?.name} (${segment.da?.code})`,
//       duration: `${Math.floor(segment.duration / 60)}h ${segment.duration % 60}m`,
//       durationDetails: segment.stops === 0 ? 'Non Stop' : `${segment.stops} Stop`,
//       arrival: new Date(segment.at).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       }),
//       arrivalLocation: `${segment.aa?.name} (${segment.aa?.code})`,
//       class: prices[index]?.fd.ADULT?.cc || 'Unknown Class',
//       minprice: `₹${prices[index]?.fd.ADULT.fC.TF || 0}`,
//       seats: segment.sN || 0,
//       pricingOptions: prices.map((price: any) => ({
//         id: price.id,
//         fare: price.fd.ADULT.fC.price,
//         code: price.fd.ADULT.fC.code,
//         seats: price.fd.ADULT.sR,
//         class: price.fd.ADULT.cc,
//         price: price.fd.ADULT.fC.TF,
//         netfare: price.fd.ADULT.fC.NF,
//         breakdown: {
//           baseFare: price.fd.ADULT.fC.BF,
//           adultFare: price.fd.ADULT.fC.TAF,
//           taxAndCharges: price.fd.ADULT.afC.TAF.AGST,
//           userDevelopmentFee: price.fd.ADULT.afC.TAF.MU,
//           k3Tax: price.fd.ADULT.afC.TAF.OT,
//           airlineMisc: price.fd.ADULT.afC.TAF.YQ,
//         },
//       })),
//     }));

//     return mappedSeg;
//   };



//   export const mapReturnFlightData = (tripInfos: any): Flight[] => {
//     return tripInfos.RETURN.flatMap((flightData: any) => mapFlightData(flightData));
//   };

//   // Function to map onward flight data
//   export const mapOnwardFlightData = (tripInfos: any): Flight[] => {
//     return tripInfos.ONWARD.flatMap((flightData: any) => mapFlightData(flightData));
//   };


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flight } from "../../Interfaces/UI/flightList";

// Function to map flight data to the required structure
export const mapFlightData = (flightData: any): Flight[] => {
  const prices = flightData.totalPriceList || [];
  const segments = flightData.sI || [];

  const mappedSeg = segments.map((segment: any, index: number) => ({
    airline: segment.fD?.aI?.name || 'Unknown Airline',
    icon: `/path/to/airline-icons/${segment.fD?.aI?.code}.png`,
    departure: new Date(segment.dt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    departureLocation: `${segment.da?.name} (${segment.da?.code})`,
    departureCode: segment.da?.code,
    arrivalCode: segment.aa?.code,
    arrivalDate: `${new Date(segment.at).toLocaleDateString()}`,
    departureDate: `${new Date(segment.dt).toLocaleDateString()}`,
    duration: `${Math.floor(segment.duration / 60)}h ${segment.duration % 60}m`,
    durationDetails: segment.stops === 0 ? 'Non Stop' : `${segment.stops} Stop`,
    arrival: new Date(segment.at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),

    arrivalLocation: `${segment.aa?.name} (${segment.aa?.code})`,
    class: prices[index]?.fd.ADULT?.cc || 'Unknown Class',
    minprice: `₹${prices[index]?.fd.ADULT.fC.TF || 0}`,
    seats: segment.sN || 0,
    stopovers: segment.so?.map((stop: any) => ({
      code: stop.code,
      name: stop.name,
      city: stop.city,
      country: stop.country,
      terminal: stop.terminal,
    })) || [],
    pricingOptions: prices.map((price: any) => ({
      id: price.id,
      fare: price.fd.ADULT.fC.price,
      fareIdentifier: price.fareIdentifier,
      sri: price.sri, // Add sri to the mapped segment
      msri: price.msri || [],
      code: price.fd.ADULT.fC.code,
      seats: price.fd.ADULT.sR,
      class: price.fd.ADULT.cc,
      price: price.fd.ADULT.fC.TF,
      netfare: price.fd.ADULT.fC.NF,
      breakdown: {
        baseFare: price.fd.ADULT.fC.BF,
        adultFare: price.fd.ADULT.fC.TAF,
        taxAndCharges: price.fd.ADULT.afC.TAF.AGST,
        userDevelopmentFee: price.fd.ADULT.afC.TAF.MU,
        k3Tax: price.fd.ADULT.afC.TAF.OT,
        airlineMisc: price.fd.ADULT.afC.TAF.YQ,
      },
    })),
  }));

  return mappedSeg;
};



export const mapReturnFlightData = (tripInfos: any): Flight[] => {
  return tripInfos.RETURN.flatMap((flightData: any) => mapFlightData(flightData));
};

// Function to map onward flight data
export const mapOnwardFlightData = (tripInfos: any): Flight[] => {
  return tripInfos.ONWARD.flatMap((flightData: any) => mapFlightData(flightData));
};
export const mapMulticityFlightData = (tripInfos: any): Flight[][] => {
  return Object.values(tripInfos).map((flights: any) =>
    flights.map((flight: any) => {
      const segments = flight.sI || [];
      const prices = flight.totalPriceList || [];

      return segments.map((segment: any, index: number) => ({
        airline: segment.fD?.aI?.name || 'Unknown Airline',
        icon: `/path/to/airline-icons/${segment.fD?.aI?.code}.png`,
        departure: new Date(segment.dt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        departureLocation: `${segment.da?.name} (${segment.da?.code})`,
        departureCode: segment.da?.code,
        arrivalCode: segment.aa?.code,
        arrivalDate: `${new Date(segment.at).toLocaleDateString()}`,
        departureDate: `${new Date(segment.dt).toLocaleDateString()}`,
        duration: `${Math.floor(segment.duration / 60)}h ${segment.duration % 60}m`,
        durationDetails: segment.stops === 0 ? 'Non Stop' : `${segment.stops} Stop`,
        arrival: new Date(segment.at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        arrivalLocation: `${segment.aa?.name} (${segment.aa?.code})`,
        class: prices[index]?.fd.ADULT?.cc || 'Unknown Class',
        minprice: `₹${prices[index]?.fd.ADULT.fC.TF || 0}`,
        seats: segment.sN || 0,
        stopovers: segment.so?.map((stop: any) => ({
          code: stop.code,
          name: stop.name,
          city: stop.city,
          country: stop.country,
          terminal: stop.terminal,
        })) || [],
        pricingOptions: prices.map((price: any) => ({
          id: price.id,
          fare: price.fd.ADULT.fC.price,
          code: price.fd.ADULT.fC.code,
          seats: price.fd.ADULT.sR,
          class: price.fd.ADULT.cc,
          price: price.fd.ADULT.fC.TF,
          netfare: price.fd.ADULT.fC.NF,
          breakdown: {
            baseFare: price.fd.ADULT.fC.BF,
            adultFare: price.fd.ADULT.fC.TAF,
            taxAndCharges: price.fd.ADULT.afC.TAF.AGST,
            userDevelopmentFee: price.fd.ADULT.afC.TAF.MU,
            k3Tax: price.fd.ADULT.afC.TAF.OT,
            airlineMisc: price.fd.ADULT.afC.TAF.YQ,
          },
        })),
      }));
    })
  );
};