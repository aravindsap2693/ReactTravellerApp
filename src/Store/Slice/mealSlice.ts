import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MealItem {
  dish: string;
  price: number;
  quantity: number;
  Image: string;
}
interface MealState {
  selectedMeals: MealItem[];
  totalPrice: number;
}

const initialState: MealState = {
  selectedMeals: [],
  totalPrice: 0,
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setSelectedMeals: (state, action: PayloadAction<MealItem[]>) => {
      state.selectedMeals = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { setSelectedMeals, setTotalPrice } = mealSlice.actions;
export default mealSlice.reducer;

export const mealReducer = mealSlice.reducer
