import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself

export const TotalCartQuantity = (state: RootState) => state.cart.totalQuantity;
export const TotalCartAmount = (state: RootState) => state.cart.totalAmount;
export const CartProducts = (state: RootState) => state.cart.items;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
