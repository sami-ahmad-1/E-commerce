import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/product/productsSlice'

export const store = configureStore({
  reducer: {
    product : productSlice 
  },
});
