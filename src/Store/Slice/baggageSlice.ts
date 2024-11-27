// baggageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaggageItem {
  title: string;
  price: number;
  isSelected: boolean;
  quantity: number;
  Image: string;
  value?: number;
}

interface BaggageState {
  baggageType: BaggageItem[];
  totalPrice: number;
  totalWeight: number;
}

const initialState: BaggageState = {
  baggageType: [],
  totalPrice: 0,
  totalWeight: 0,
};

const baggageSlice = createSlice({
  name: 'baggage',
  initialState,
  reducers: {
    setBaggage(state, action: PayloadAction<BaggageItem[]>) {
      state.baggageType = action.payload;
      state.totalWeight = action.payload.reduce((total, item) => total + (item.value || 0), 0);
    },
    addBaggage(state, action: PayloadAction<number>) {
      const item = state.baggageType[action.payload];
      item.quantity += 1;
      item.isSelected = true;
      state.totalPrice += item.price;
      state.totalWeight += item.value || 0;
    },
    removeBaggage(state, action: PayloadAction<number>) {
      const item = state.baggageType[action.payload];
      if (item.quantity > 0) {
        item.quantity -= 1;
        item.isSelected = item.quantity > 0;
        state.totalPrice -= item.price;
        state.totalWeight -= item.value || 0;
      }
    },
    resetBaggage(state) {
      state.baggageType = [];
      state.totalPrice = 0;
      state.totalWeight = 0;
    },
  },
});

export const { setBaggage, addBaggage, removeBaggage, resetBaggage } = baggageSlice.actions;
export default baggageSlice.reducer;
