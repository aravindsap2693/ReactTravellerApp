/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance"; 
// Use import.meta.env to access environment variables in Vite
const baseUrl = import.meta.env.VITE_BASE_URL;

const env = {
  async get(path: string, params?: any) {
    try {
      const url = new URL(path, baseUrl); // Constructs the full URL
      console.log("url", url);

      // Append query parameters if any
      if (params) {
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      }
      // Make the GET request using Axios
      const response = await axiosInstance.get(url.toString(), { params });

      return response.data; // Return the parsed data directly
    } catch (error) {
      console.error("GET Error: ", error);
      throw error; // Rethrow the error for further handling
    }
  },

  async post(path: string, payload: any) {
    try {
      const response = await axiosInstance.post(baseUrl + path, payload);

      return response.data; // Return the parsed data directly
    } catch (error) {
      console.error("POST Error: ", error);
      throw error; // Rethrow the error for further handling
    }
  },

  async put(path: string, payload: any) {
    try {
      const response = await axiosInstance.put(baseUrl + path, payload);

      return response.data; // Return the parsed data directly
    } catch (error) {
      console.error("PUT Error: ", error);
      throw error; // Rethrow the error for further handling
    }
  },
};

export default env;
