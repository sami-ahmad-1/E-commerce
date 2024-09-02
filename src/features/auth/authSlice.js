import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, userAddressAPI, SignOut } from './authAPI';

const initialState = {
  // loggedInUserToken: null,
  // status: null,
  // error: ''
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
)


export const checkLoginUser = createAsyncThunk(
  'user/checkLoginUser',
  async (LoginInfo, { rejectWithValue }) => {
    try {
      const response2 = await checkUser(LoginInfo);
      return response2.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.message)
    }

  }
);

export const userAddress = createAsyncThunk(
  'user/userAddress',
  async (userId) => {
    const response = await userAddressAPI(userId);
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
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken += action.payload;
      })
      .addCase(checkLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(checkLoginUser.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUserToken = action.payload;
      //   localStorage.setItem("replace", "true");
      // })
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
        state.loggedInUserToken = action.payload
      })
      .addCase(SignOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(SignOutAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUserToken = null
      // })
      .addCase(SignOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        localStorage.removeItem('userToken'); // Remove token from localStorage on logout
      });
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error

export default counterSlice.reducer;

