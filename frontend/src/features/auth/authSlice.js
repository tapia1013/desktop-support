import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// REGISTER NEW USER....user comes from FORM
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    // backend error message
    const message = (error.response &&
      error.response.data &&
      error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// LOGIN USER
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // if we create something in here we have to export at the bottom... export const {reset} = authSlice.actions
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  // we can hook with redux toolkit state like auth/login/pending auth/login/fullfilled etc...
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        // when its pending we want it to be set to isLoading
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        // since its fulfilled we also bring in action
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        // for error
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;