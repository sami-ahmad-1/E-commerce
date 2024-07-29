import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartAPI , fetchProductDetailAPI, RemoveProductAPI , updateCart} from './cartAPI';

const initialState = {
  value: 0,  
  productDetail:null,
  items : []
};

export const AddToCart = createAsyncThunk(
  'cart/addTocart',
  async (CartData) => {
    console.log(CartData)
    const response = await CartAPI(CartData);
    return response.data;
  }
)

export const fetchProductByUserId = createAsyncThunk(
  'products/fetchProductDetail',
  async (UserId) => {
    const response = await fetchProductDetailAPI(UserId);  
    return response.data;
  }
);


export const RemoveProductAsync = createAsyncThunk(
  'products/RemoveProductAsync',
  async (product) => {
    const response = await RemoveProductAPI(product.id);  
    return response.data;
  }
)


export const updateItemAsync = createAsyncThunk(
  'cart/updateItemAsync',
  async (update) => {
    const response = await updateCart(update);
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
        state.cartItems.push(action.payload)
      })
      .addCase(fetchProductByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByUserId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;            
        // state.items.push(action.payload) 
      })
      .addCase(RemoveProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RemoveProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex( el => el.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id===action.payload.id)          
        state.items[index] = action.payload;
      })
  }
});

export const cartItemsSlice = (state) => state.cart.items;
export const productDetailSlice = (state) => state.cart.productDetail;
export default CartSlice.reducer;

