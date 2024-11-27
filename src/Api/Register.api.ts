/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterPayload, RegisterResponse } from "../Interfaces/models/register.model";
import {
  fetchRegisterStart,
  fetchRegisterSuccess,
  fetchRegisterFailure,
} from "../Store/Slice/registerSlice"; 
import { AppDispatch } from "../Store/store";
import env from "./Services/api";


// Register function using Axios
export const register =
  (payload: RegisterPayload) => async (dispatch: AppDispatch) => {
    dispatch(fetchRegisterStart());
    try {
      // Using Axios to send a POST request
      const response = await env.post("v1/register", payload);   
      const data: RegisterResponse = response.data; 
      dispatch(fetchRegisterSuccess(data.data));
      return data.data;
    } catch (error: any) {
      // Handling errors
      const errorData = error.response?.data || error.message; 
      dispatch(fetchRegisterFailure(errorData));
      console.error("Registration error:", error);
      return errorData;
    }
  };
