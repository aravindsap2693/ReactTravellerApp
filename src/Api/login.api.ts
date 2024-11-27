/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginCredentials } from "../Interfaces/models/login.model";
import {
  fetchLoginStart,
  fetchLoginFailure,
  fetchLoginSuccess,
} from "../Store/Slice/authSlice";
import {
  fetchLogoutStart,
  fetchLogoutFailure,
  fetchLogoutSuccess,
} from "../Store/Slice/authSlice";
import env from "./Services/api";


export const login = (payload: LoginCredentials) => async (dispatch: any) => {
  dispatch(fetchLoginStart()); // Use parsed response
  try {
    const data = await env.post(`v1/login`, payload); // Use ENV.get to fetch data
    console.log("DATA",data)
    localStorage.setItem("accessToken", data?.response?.token); // Store the access token
    localStorage.setItem("refreshToken", data?.response?.refreshToken);
    dispatch(fetchLoginSuccess(data));
    return data;
  } catch (error: any) {
    console.error(error);
    dispatch(fetchLoginFailure(error)); // Use parsed response
    return error;
  }
};

export const handleLogout = async (dispatch: any, payload: any) => {
  dispatch(fetchLogoutStart()); 
  try {
    const data = await env.post("auth/logout", payload);
    localStorage.removeItem("accessToken");
    dispatch(fetchLogoutSuccess(data));
    return data;
  } catch (error: any) {
    console.error(error);
    dispatch(fetchLogoutFailure(error)); 
    return error;
  }
};
