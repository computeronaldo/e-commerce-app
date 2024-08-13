import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, product } = action.payload;
      const exists = state.cart.findIndex((item) => item._id === productId);
      if (exists === -1) {
        state.cart.push({ ...product, quantity: 1 });
      } else {
        state.cart[exists].quantity = state.cart[exists].quantity + 1;
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const index = state.cart.findIndex((item) => item._id === productId);
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item._id !== productId);
      } else {
        state.cart[index].quantity = state.cart[index].quantity - 1;
      }
    },
    deleteFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cart = state.cart.filter((item) => item._id !== productId);
    },
    emptyCart: (state, _action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, emptyCart } =
  cartSlice.actions;
export default cartSlice;
