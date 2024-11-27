/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export interface AuthState {
  isLogedin: any;
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  data: User | null;
  error: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  first_name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Define a type for the response data
export interface LoginResponse {
  message: string;
  status: string;
  user_data: User[]; // Adjust this type according to your actual response structure
  token: string;
  errors?: { message: string }[];
}

export interface LoginRef {
  openModal?: () => void;
  closeModal?: () => void;
}
