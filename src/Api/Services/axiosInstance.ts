/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Base URL from environment variables
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request Interceptor for Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling 401 and token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If 401 error occurs and the request hasn't been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken(); // Call refresh token function
        localStorage.setItem("accessToken", newAccessToken); // Save new access token

        // Update Authorization header with new token
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        throw refreshError; // Throw the error if refreshing the token fails
      }
    }

    return Promise.reject(error);
  }
);

// Token refresh function
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage

  if (!refreshToken) {
    throw new Error("No refresh token available. Please log in again.");
  }

  try {
    // Send a request to refresh the token using the stored refresh token
    const response = await axiosInstance.post("/auth/refresh-token", {
      token: refreshToken, // Refresh token from localStorage
    });

    // Assuming the response contains both accessToken and refreshToken
    const newAccessToken = response.data.response.token; // Access the new access token
    const newRefreshToken = response.data.response.refreshToken; // Get new refresh token if provided

    // Update both tokens in localStorage
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken); // Update refresh token if it's refreshed

    return newAccessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh token. Please log in again.");
    throw new Error("Failed to refresh token. Please log in again.");
  }
};

// API methods grouped together within axiosInstance
const api = {
  async get(path: string, params?: any) {
    try {
      const response = await axiosInstance.get(path, { params });
      return response.data; // Axios already returns the data
    } catch (error) {
      console.error('GET Error: ', error);
      throw error;
    }
  },

  async post(path: string, payload: any) {
    try {
      const response = await axiosInstance.post(path, payload);
      return response.data; // Axios already returns the data
    } catch (error) {
      console.error('POST Error: ', error);
      throw error;
    }
  },

  async put(path: string, payload: any) {
    try {
      const response = await axiosInstance.put(path, payload);
      return response.data; // Axios already returns the data
    } catch (error) {
      console.error('PUT Error: ', error);
      throw error;
    }
  },
};

// Export both the axiosInstance and the api methods
export { axiosInstance, api };