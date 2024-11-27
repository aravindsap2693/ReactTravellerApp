/* eslint-disable @typescript-eslint/no-explicit-any */
import { setError, setStateList } from "../Store/Slice/stateSlice";
import env from "./Services/api";

// export const fetchStateListData = () => async (dispatch: any) => {
//   try {
//     // Make the GET request to fetch the states
//     const response = await fetch("http://143.110.251.96/backend/api/v1/config/states", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.message || "Error fetching states");
//     }

//     dispatch(setStateList(data.response));

//     return data.response;
//   } catch (error: any) {
//     console.error("Failed to fetch state list:", error);
//     dispatch(setError(error.message || "Unknown error"));
//   }
// };




export const fetchStateListData = () => async (dispatch: any) => {
  try {
    // Make the GET request to fetch the states using Axios
    const response = await env.get("v1/states"); 
    // Check if the response contains an error
    if (response.error) {
      throw new Error(response.message || "Error fetching states");
    }
    dispatch(setStateList(response.response)); 
    return response.response; // Returning the data
  } catch (error: any) {
    console.error("Failed to fetch state list:", error);
    dispatch(setError(error.message || "Unknown error")); 
  }
};

