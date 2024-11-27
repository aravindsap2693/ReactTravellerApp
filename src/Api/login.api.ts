/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginCredentials } from "../Interfaces/models/login.model";
import {
  fetchLoginStart,
  fetchLoginFailure,
  fetchLoginSuccess,
} from "../Store/Slice/authSlice";
import { AppThunk, clearStore } from "../Store/store";
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

// export const handleLogout = async (dispatch: any, payload: any) => {
//   dispatch(fetchLogoutStart()); 
//   try {
//     const data = await env.post("v1/logout", payload);
//     localStorage.removeItem("accessToken");
//     dispatch(fetchLogoutSuccess(data));
//     return data;
//   } catch (error: any) {
//     console.error(error);
//     dispatch(fetchLogoutFailure(error)); 
//     return error;
//   }
// };

export const logout =
  (navigate: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      await clearStore(); // Clear Redux state and persistent data
      dispatch({ type: "LOGOUT_SUCCESS" }); // Update `isLogedin` in the store
      const { auth } = getState(); // Get updated state
      if (!auth.isLogedin) {
        navigate("/"); // Redirect to the homepage if logged out
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


export const forgetPassword = async (email: string) => {
  try {
    const data = await env.post(`v1/users/forget-password?email=${email}`, {}); // Pass an empty object as the second argument
    console.log("Forget Password Response:", data);
    return data; // Return the response data
  } catch (error: any) {
    console.error("Forget Password Error:", error);
    return Promise.reject(error); // Return the error to be handled by the caller
  }
};


