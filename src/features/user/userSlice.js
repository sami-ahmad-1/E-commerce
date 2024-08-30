import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchLoggedInUserOrders , fetchLoggedInUser ,updateUserInfoAPI} from './userAPI'

const initialState = {
  userOrders: null ,
  userInfo: null,
  status: 'idle'
};

export const fetchuserOrdersAsync = createAsyncThunk(
  'user/fetchuserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;    
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUserAsync',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;    
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfoAsync',
  async (userId) => {
    const response = await updateUserInfoAPI(userId);
    return response.data;    
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: () => {  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo += action.payload
      })

  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
