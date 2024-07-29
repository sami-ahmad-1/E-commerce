import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,userAddressAPI,SignOut } from './authAPI';

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
    return response.data;        
  }
)
export const SignOutAsync = createAsyncThunk(
  'user/SignOut',
  async (LoggedInInfo) => {
    const response = await SignOut(LoggedInInfo);    
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
        localStorage.setItem("replace", "true");
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
      .addCase(SignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';        
        state.loggedInUser = null
      })
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError  = (state) => state.auth.error

export default counterSlice.reducer;

