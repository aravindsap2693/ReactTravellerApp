/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Flight } from "../UI/flightList";

export interface FieldOptionProps {
  label: string;
  value: number | string;
}

export interface FieldProps {
  title?: string;
  placeholder?: string | any;
  name?: string;
  type?:
    | "input"
    | "select"
    | "checkbox"
    | "radio"
    | "input_btn"
    | "password"
    | "terms";
  options?: FieldOptionProps[];
  value?: string | boolean | any;
  searchable?: boolean;
  accepter?: any | null;
  validationMessage?: any;
  onChange?: (name: any, value: number | boolean | string) => void;
}

export interface TButtonProps {
  children?: React.ReactNode
  style?: React.CSSProperties;
  label?: string;
  type?: "primary" | "default" | "link" | "ghost";
  icon?: ReactNode;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
  padding?: string;
  block?: boolean; // Add this prop
  background?: string;
  submit?: boolean;
}

export interface TabNavItemProps {
  title: string;
  key: string;
  content: React.ReactNode;
}

export interface TTabProps {
  TabNav: TabNavItemProps[];
}

export interface DataItemProps {
  [key: string]: string;
}

export interface DataTableProps {
  data: DataItemProps[];
  headers: string[];
  icons?: { [key: string]: string };
}

export interface AccordionProps {
  header?: string; 
  render?: ReactNode; 
  classname?: string; 
  defaultExpanded?: boolean;
  icon?: string; 
}

export interface TimerProps {
  seconds?: number; 
  fontColor?: string; 
  timeInSec?: number; 
}

export interface InitialStateProps {
  loading: boolean;
  data:any | null;
  onwardFlights: Flight[] | null;
  returnFlights: Flight[] | null;
  comboFlights: Flight[]| null;
  error: any | null;
  dynamicFilters: any | null;
  twoWayDynamicFilters: any | null;
  formattedData: any | null;
}
export interface InitialStateRoundTripProps {
  loading: boolean;
  data:any | null;
  onwardFlights: Flight[] | null;
  returnFlights: Flight[] | null;
  comboFlights: Flight[] | null;
  error: any | null;
  dynamicFilters: any | null;
  twoWayDynamicFilters: any | null;
  formattedOnwardData: any | null;
  formattedReturnData: any | null;
}
