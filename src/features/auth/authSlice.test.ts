import { TAuthResponse } from '@api';
import authReducer, {
  initialState,
  loginUserAsync,
  logoutAsync,
  registerUserAsync
} from './authSlice';
import { testUser } from '../../utils/testConstants';
jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserAp: jest.fn()
}));

const {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserAp
} = require('@api');

describe('тестируем authSlice', () => {
  it('проверяем начальное состояние', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  describe('тестируем асинхронный экшн registerUserAsync', () => {
    it('проверяем запрос регистрации', async () => {
      const action = { type: registerUserAsync.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });
    it('проверяем успешную регистрацию', async () => {
      const mockUser: TAuthResponse = testUser;
      const action = {
        type: registerUserAsync.fulfilled.type,
        payload: mockUser
      };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        user: mockUser.user,
        isAuthenticated: true,
        success: mockUser.success
      });
    });
    it('проверяем ошибку при регистрации', async () => {
      const errorMsg = 'Ошибка регистрации';
      registerUserApi.mockRejectedValueOnce(new Error(errorMsg));
      const action = {
        type: registerUserAsync.rejected.type,
        payload: errorMsg
      };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMsg
      });
    });
  });
  describe('тестируем экшн loginUserAsync', () => {
    it('проверяем запрос входа пользователя', async () => {
      const action = { type: loginUserAsync.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });
    it('проверяем успешный результат входа пользователя', async () => {
      const mockUser: TAuthResponse = testUser;
      const action = { type: loginUserAsync.fulfilled.type, payload: mockUser };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        user: mockUser.user,
        isAuthenticated: true,
        success: mockUser.success
      });
    });
    it('проверяем ошибку при входе пользователя', async () => {
      const errorMsg = 'Ошибка авторизации';
      loginUserApi.mockRejectedValueOnce(new Error(errorMsg));
      const action = { type: loginUserAsync.rejected.type, payload: errorMsg };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMsg
      });
    });
  });
  describe('тестируем экшн logoutUserAsync', () => {
    it('проверяем запрос выхода пользователя', async () => {
      const action = { type: logoutAsync.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });
    it('проверяем успешный результат выхода пользователя', async () => {
      const action = { type: logoutAsync.fulfilled.type };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        isAuthenticated: false,
        user: null
      });
    });
    it('проверяем ошибку при выходе пользователя', async () => {
      const errorMsg = 'Ошибка выхода';
      logoutApi.mockRejectedValueOnce(new Error(errorMsg));
      const action = { type: logoutAsync.rejected.type, payload: errorMsg };
      const newState = await authReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMsg
      });
    });
  });
});
