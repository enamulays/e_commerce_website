import { Product } from "@/type_local";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [] as Product[],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item && item.quantity !== undefined) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;
