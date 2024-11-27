export interface PricingOption {
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

export interface Flight {
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