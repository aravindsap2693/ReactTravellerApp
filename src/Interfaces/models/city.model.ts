// Type definition for individual city items
export interface cityItemProps {
  city: string; // Name of the city
  id: number;   // Unique identifier for the city
}

// Type definition for the API response containing cities
export interface CityResponse {
  status: string;         // Status of the response
  error: boolean;        // Error flag
  message: string;       // Message about the response
  response: cityItemProps[]; // Array of city items
}
