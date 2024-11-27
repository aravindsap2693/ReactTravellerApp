export interface PricingOption {
  id: string;
  fare: number;
  fareIdentifier: string;
  sri: string; // Add sri to the mapped segment
  msri: string;
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

export interface Flight {
  travelDate: string;
  airline: string;
  icon: string;
  departure: string;
  departureCode: string;
  arrivalCode: string;
  departureDate: string;
  arrivalDate: string;
  departureLocation: string;
  duration: string;
  durationDetails: string;

  arrival: string;

  arrivalLocation: string;
  class: string;
  minprice: string;
  seats: number;
  pricingOptions: {
    id: string;
    fare: number;
    fareIdentifier: string;
    sri: string; // Add sri to the mapped segment
    msri: string;
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
  }[];
}

export interface IRoundTripFilter {
  airline: string;
  arrival: string;
  arrivalLocation: string;
  class: string;
  departure: string;
  departureLocation: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  durationDetails: string;
  icon: string;
  minprice: string;
  seats: number;
  pricingOptions: {
    id: string;
    fare?: string;
    fareIdentifier?: string;
    sri: string; // Add sri to the mapped segment
    msri: string;
    code?: string;
    seats: number;
    class: string;
    price: number;
    netfare: number;
  }[];
}