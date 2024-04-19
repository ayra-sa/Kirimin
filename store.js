import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./features/basketSlice";
import quantitySlice from "./features/quantitySlice";
import restaurantSlice from "./features/restaurantSlice";

export const store = configureStore({
    reducer : {
        basket: basketSlice,
        quantity: quantitySlice,
        restaurant: restaurantSlice
    }
})