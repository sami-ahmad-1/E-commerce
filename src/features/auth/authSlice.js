import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, userAddressAPI, SignOut } from './authAPI';

const initialState = {
  loggedInUserToken: localStorage.getItem('userToken') || null, // Load token from localStorage
  status: null,
  error: ''
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (data) => {
    const response = await createUser(data);
    return response.data;
  }
);

export const checkLoginUser = createAsyncThunk(
  'user/checkLoginUser',
  async (LoginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(LoginInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const userAddress = createAsyncThunk(
  'user/userAddress',
  async (userId) => {
    const response = await userAddressAPI(userId);
    return response.data;
  }
);

export const SignOutAsync = createAsyncThunk(
  'user/SignOut',
  async (LoggedInInfo) => {
    const response = await SignOut(LoggedInInfo);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken += action.payload; // If payload is just the token
        localStorage.setItem('userToken', action.payload);
      })
      .addCase(checkLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        localStorage.setItem('userToken', action.payload); // Save token to localStorage
      })
      .addCase(checkLoginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(userAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload; // If this also returns a token, ensure this is correct
      })
      .addCase(SignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        localStorage.removeItem('userToken'); // Clear token from localStorage on logout
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
