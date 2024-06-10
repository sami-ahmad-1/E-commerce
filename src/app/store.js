import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/product/productsSlice'
import authReducer from '../features/auth/authSlice'
import cartSlice from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    product : productSlice  ,
    auth : authReducer ,
    cart : cartSlice
  },
});
