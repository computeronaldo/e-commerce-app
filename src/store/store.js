import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/Products/productsSlice";
import cartSlice from "../features/Cart/cartSlice";
import userSlice from "../features/User/userSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
