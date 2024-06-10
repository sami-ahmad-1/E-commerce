import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartAPI , fetchProductDetailAPI } from './cartAPI';

const initialState = {
  value: 0,
  items : null
};

export const AddToCart = createAsyncThunk(
  'cart/addTocart',
  async (CartData) => {
    console.log(CartData)
    const response = await CartAPI(CartData);
    return response.data;
  }
);

export const fetchProductByUserId = createAsyncThunk(
  'products/fetchProductDetail',
  async (UserId) => {
    const response = await fetchProductDetailAPI(UserId);  
    return response.data;
  }
);

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items += action.payload;
      })
      .addCase(fetchProductByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByUserId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        // console.log('State updated with product detail:', state.productDetail); // Add logging here
      })
  },
});


export const cartItemsSlice = (state) => state.cart.items;

export default CartSlice.reducer;
