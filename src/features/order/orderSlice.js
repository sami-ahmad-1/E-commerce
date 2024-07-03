import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderAPI , fetchAllOrder } from './orderAPI';

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

export const fetchAllOrderAsync = createAsyncThunk(
  'order/fetchAllOrder',
  async () => {
    const response = await fetchAllOrder()
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
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload
      })
  },
});

export const orderItems = (state) => state.orders.order;
export const AllOrders = (state) => state.orders.order

export default orderSlice.reducer;
