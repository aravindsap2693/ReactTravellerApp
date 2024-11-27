export interface RegisterPayload {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  state: number | null;
  district: number | null;
}

export interface RegisterResponse {
  data: any; // Adjust based on actual response structure
  errors?: { message: string }[];
}

// Define the type for formValues
export interface FormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  state: number | null;
  district: number | null;
  confirmPassword: string;
  is_accept: boolean;
}
