import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllProductsbyFilterAPI, fetchProductDetailAPI , addNewProductAsync} from './productsAPI';

const initialState = {
  products: [],
  productDetail: [],
  status: 'idle'  
}

//ACTIONS
export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllProductsbyFilter = createAsyncThunk(
  'products/fetchAllProductsbyFilter',
  async (filter) => {
    const response = await fetchAllProductsbyFilterAPI(filter);
    return response.data;
  }
);

export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (id) => {
    const response = await fetchProductDetailAPI(id);  
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (prodInfo) => {
    const response = await addNewProductAsync(prodInfo);
    return response.data;
  }
);

//SLICE
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsbyFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsbyFilter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productDetail = action.payload;  
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)  
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductDetail = (state) => state.product.productDetail;

export default productSlice.reducer
