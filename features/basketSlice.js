import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  showBasket: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      const newItem = { ...action.payload, quantity: 1 };

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload)

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
      }
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    openBasket: (state) => {
      state.showBasket = true;
    },
    resetBasket: (state) => {
      state.items = []
      state.showBasket = false
    }
  },
});

export const { addToBasket, openBasket, removeItem, removeFromBasket, resetBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
