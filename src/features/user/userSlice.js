import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchLoggedInUser} from './userAPI'

const initialState = {
  userOrders: '' ,
  status: 'idle',
};

export const fetchuserOrdersAsync = createAsyncThunk(
  'user/fetchuserOrders',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;    
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload
      });
  },
});

export const selectUserInfo = (state) => state.user.userOrders;

export default userSlice.reducer;
