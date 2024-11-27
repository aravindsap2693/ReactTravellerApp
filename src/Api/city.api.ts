/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCityList } from "../Store/Slice/citySlice";
import { AppDispatch } from "../Store/store";
import env from "./Services/api";

export const fetchCityListData = (stateId: number) => async (dispatch: AppDispatch) => {
  try {
    const data = await env.get(`v1/cities?stateId=${stateId}`);
    dispatch(setCityList(data));
    return data;
  } catch (error: any) {
    console.error("Error fetching assets: ", error);
  }
};
