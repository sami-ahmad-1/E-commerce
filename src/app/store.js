import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productsSlice'

export const store = configureStore({
  reducer: {
    product : productReducer
  },
});
