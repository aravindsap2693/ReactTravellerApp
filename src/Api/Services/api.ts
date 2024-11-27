/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance"; 
const baseUrl = import.meta.env.VITE_BASE_URL;

const env = {
  async get(path: string, params?: any) {
    try {
      const url = new URL(path, baseUrl); 
      console.log("url", url);
      if (params) {
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      }
      // Make the GET request using Axios
      const response = await axiosInstance.get(url.toString(), { params });
      return response.data; 
    } catch (error) {
      console.error("GET Error: ", error);
      throw error; 
    }
  },

  async post(path: string, payload: any) {
    try {
      const response = await axiosInstance.post(baseUrl + path, payload);
      return response.data; 
    } catch (error) {
      console.error("POST Error: ", error);
      throw error; 
    }
  },

  async put(path: string, payload: any) {
    try {
      const response = await axiosInstance.put(baseUrl + path, payload);
      return response.data; 
    } catch (error) {
      console.error("PUT Error: ", error);
      throw error; 
    }
  },
};

export default env;
