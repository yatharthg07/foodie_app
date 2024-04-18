import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload.card.info.id;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === itemIdToRemove
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity -= 1;
        if (state.items[existingItemIndex].quantity === 0) {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
