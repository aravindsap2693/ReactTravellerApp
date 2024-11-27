/* eslint-disable @typescript-eslint/no-explicit-any */
export type Option = {
  label?: string;
  value?: string;
  city?: string;
  flag?: any;
  airport?: string;
  address?: string;
  id?: number;
  code?: string;
  name?: string;
  cityCode?: string;
  countryCode?: string;
  country?: string;
};

export interface FlightCardProps {
  backdrop: string;
}

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
  type?: string;
}

export interface FlightDropdownProps {
  formValues: any;
  handlePassengerDetails: (
    field: keyof PassengerCounts,
    action: string | number
  ) => void;
}

export interface FlightDetails {
  id: string;
  sI: {
    id: string;
    fD: {
      aI: {
        code: string;
        name: string;
        isLcc: boolean;
      };
      fN: string;
      eT: string;
    };
    stops: number;
    duration: number;
    da: {
      code: string;
      name: string;
      cityCode: string;
      city: string;
      country: string;
      countryCode: string;
    };
    so: {

    }[];
    aa: {
      code: string;
      name: string;
      cityCode: string;
      city: string;
      country: string;
      countryCode: string;
      terminal: string;
    };
    dt: string;
    at: string;
    iand: boolean;
    isRs: boolean;
    sN: number;
  }[];
}