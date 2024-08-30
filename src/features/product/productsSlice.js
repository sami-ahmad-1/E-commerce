import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllProductsbyFilterAPI, fetchProductDetailAPI , addNewProductAsync , updateExixtingProductAPI , RemoveProductFromListAsyncAPI} from './productsAPI';
import Swal from 'sweetalert2';


const ProductAddedSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Product Added Successfully",
    showConfirmButton: false,
    timer: 1500
  });
}




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

export const updateExixtingProduct = createAsyncThunk(
  'product/updateUserInfoAsync',
  async (prod) => {
    const response = await updateExixtingProductAPI(prod);
    return response.data;    
  }
);

export const RemoveProductFromListAsync = createAsyncThunk(
  'products/RemoveProductAsync',
  async (product) => {
    const response = await RemoveProductFromListAsyncAPI(product);  
    return response.data;
  }
)




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
        state.productDetail = action.payload 
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)  
        ProductAddedSuccess()
      })
      .addCase(updateExixtingProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExixtingProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productDetail = action.payload 
      })
      .addCase(RemoveProductFromListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RemoveProductFromListAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex( el => el.id===action.payload.id)
        state.products.splice(index,1)
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductDetail = (state) => state.product.productDetail;

export default productSlice.reducer
