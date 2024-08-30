import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderAPI , fetchAllOrder , updateOrderAPI } from './orderAPI';
import {AddToCart} from '../cart/cartSlice'
import { useDispatch } from 'react-redux';

const initialState = {
  order: [],
  status: 'idle',
  currentOrderPlaced: false
};

export const createOrderAsync = createAsyncThunk(
  'order/OrderAsync',
  async (order) => {    
    const response = await OrderAPI(order)
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

export const updateOrderStatueAsync = createAsyncThunk(
  'order/updateOrderStatue',
  async (order) => {
    const response = await updateOrderAPI(order)
    console.log("Order" , order)
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrderPlaced = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order.push( action.payload)        
        state.currentOrderPlaced = action.payload
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload
      })
      .addCase(updateOrderStatueAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatueAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.order.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.order[index] = action.payload
        }
      })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrderPlaced;
export const orderItems = (state) => state.orders.order;
export const AllOrders = (state) => state.orders.order;

export default orderSlice.reducer;
