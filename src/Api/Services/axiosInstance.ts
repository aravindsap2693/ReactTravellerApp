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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken(); 
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        throw refreshError; 
      }
    }
    return Promise.reject(error);
  }
);

// Token refresh function
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken"); 
  if (!refreshToken) {
    throw new Error("No refresh token available. Please log in again.");
  }
  try {
    const response = await axiosInstance.post("v1/refresh", {
      token: refreshToken,
    });
    const newAccessToken = response.data.response.token; 
    const newRefreshToken = response.data.response.refreshToken; 
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken); 
    return newAccessToken;
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
      return response.data; 
    } catch (error) {
      console.error('GET Error: ', error);
      throw error;
    }
  },

  async post(path: string, payload: any) {
    try {
      const response = await axiosInstance.post(path, payload);
      return response.data; 
    } catch (error) {
      console.error('POST Error: ', error);
      throw error;
    }
  },

  async put(path: string, payload: any) {
    try {
      const response = await axiosInstance.put(path, payload);
      return response.data; 
    } catch (error) {
      console.error('PUT Error: ', error);
      throw error;
    }
  },
};

export { axiosInstance, api };