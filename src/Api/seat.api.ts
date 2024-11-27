/* eslint-disable @typescript-eslint/no-explicit-any */
import env from "./Services/api"; // Assuming you have an API service setup in env

export const fetchSeatData = async (bookingId:any) => {
  try {
    const response = await env.post(`v1/booking/seats`, { bookingId: bookingId });
    return response; // Return data for further usage
  } catch (error: any) {
    console.error("Error fetching seat data: ", error);
    throw error; // You can also handle errors here based on your app's needs
  }
};
