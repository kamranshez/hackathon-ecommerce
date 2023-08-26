import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: Array<any>;
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state: CartState,
      action: PayloadAction<{ product: any; quantity: number }>
    ) {
      const newItem = action.payload.product;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity = state.totalQuantity + action.payload.quantity;
      state.totalAmount =
        state.totalAmount +
        action.payload.quantity * action.payload.product.price;

      if (!existingItem) {
        const totalPrice = newItem.price * action.payload.quantity;
        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice,
        });
      } else {
        const totalPrice =
          existingItem.totalPrice +
          existingItem.price * action.payload.quantity;
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = totalPrice;
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        existingItem.totalPrice =
          action.payload.quantity * Number(existingItem.price);
      }

      let sum = 0;
      let itPrice = 0;
      state.items.forEach((element) => {
        sum += element.quantity;
        itPrice += element.quantity * Number(element.price);
      });
      state.totalQuantity = sum;
      state.totalAmount = itPrice;
    },
    deleteItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
      }

      state.items = state.items.filter((e) => {
        return e.id != action.payload.id;
      });
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
