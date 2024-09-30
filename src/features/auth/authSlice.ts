import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../../services/store';
import { getCookie, setCookie } from '../../utils/cookie';

type AuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  success: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  success: false,
  loading: false,
  error: null
};

export const registerUserAsync = createAsyncThunk(
  'register/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue('Вы уже зарегистрированы');
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка авторизации');
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken');

      if (accessToken) {
        const response = await getUserApi();
        if (response.user) {
          dispatch(setUser(response.user));
          dispatch(setIsAuthenticated(true));
        } else {
          return rejectWithValue('Ошибка загрузки данных пользователя');
        }
        return response;
      } else {
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      return rejectWithValue('Ошибка авторизации');
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка обновления информации о пользователе');
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка выхода');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUserAsync.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.success = true;
          // state.accessToken = action.payload.accessToken;
          // state.refreshToken = action.payload.refreshToken;
        }
      )
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.success = true;
        }
      )
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<Partial<TUserResponse>>) => {
          state.loading = false;
          state.error = null;
          if (state.user) {
            state.user = {
              ...state.user,
              ...action.payload.user
            };
          }
        }
      )
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        document.cookie = 'accessToken=;';
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setUser, setIsAuthenticated } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
