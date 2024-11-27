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
