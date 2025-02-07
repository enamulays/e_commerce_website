import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const allProductsSlice = createSlice({
  name: "filteredProducts",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = allProductsSlice.actions;

export default allProductsSlice.reducer;
