import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,userAddressAPI } from './authAPI';

const initialState = {
  loggedInUser:null,
  status :null,
  error:''
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (data) => {
    const response = await createUser(data);
    return response.data;
  }
)


export const checkLoginUser = createAsyncThunk(
  'user/checkLoginUser',
  async (LoginInfo) => {
    const response2 = await checkUser(LoginInfo);        
    return response2.data;
  }
);

export const userAddress = createAsyncThunk(
  'user/userAddress',
  async (data) => {
    const response = await userAddressAPI(data);
    console.log(response.data)
    return response.data;        
  }
)


export const counterSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser += action.payload;
      })
      .addCase(checkLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkLoginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(userAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAddress.fulfilled, (state, action) => {
        state.status = 'idle';        
        state.loggedInUser.addresses.push(action.payload)
      })
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError  = (state) => state.auth.error

export default counterSlice.reducer;

