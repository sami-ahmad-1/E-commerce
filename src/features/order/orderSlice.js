import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderAPI } from './orderAPI';

const initialState = {
  order: [],
  status: 'idle',
  currentOrderPlaces: false
};

export const OrderAsync = createAsyncThunk(
  'order/OrderAsync',
  async (OrderData) => {
    const response = await OrderAPI(OrderData)
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {  },
  extraReducers: (builder) => {
    builder
      .addCase(OrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(OrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order.push( action.payload)
        state.currentOrderPlaces = true
      });
  },
});

export const orderItems = (state) => state.orders.order;

export default orderSlice.reducer;
