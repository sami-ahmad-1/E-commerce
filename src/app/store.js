import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/product/productsSlice'
import authReducer from '../features/auth/authSlice'
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authReducer,
    cart: cartSlice,
    orders: orderSlice,
    user: userSlice
  },
});
