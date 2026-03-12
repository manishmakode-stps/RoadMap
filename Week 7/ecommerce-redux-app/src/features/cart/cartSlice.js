import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart(state, action) {

      const productId = action.payload;

      if (!state.items[productId]) {
        state.items[productId] = {
          productId,
          quantity: 1
        };
      } else {
        state.items[productId].quantity += 1;
      }

      state.totalQuantity += 1;
    },

    removeFromCart(state, action) {

      const productId = action.payload;

      if (!state.items[productId]) return;

      state.totalQuantity -= 1;

      if (state.items[productId].quantity === 1) {
        delete state.items[productId];
      } else {
        state.items[productId].quantity -= 1;
      }

    }

  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state) => state.cart;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;