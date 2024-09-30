import { TAuthResponse } from '@api';
import authReducer, {
  initialState,
  loginUserAsync,
  logoutAsync,
  registerUserAsync
} from './authSlice';
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
      const mockUser: TAuthResponse = {
        success: true,
        user: {
          email: 'kerzolys@yandex.ru',
          name: 'gleb'
        },
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmE4ZjU3MTE5ZDQ1MDAxYjUwYTdkMSIsImlhdCI6MTcyNzY5NjcyNywiZXhwIjoxNzI3Njk3OTI3fQ.d4px2EAryBAjE3ljvbz6AOAwDXrldZ_CWUWIm6xA8ew',
        refreshToken:
          'a29bee7a9aa925bfc22da2f69e28c9b449a90aeef5aa8bca3a13ab32f3c43fc3153cd5dd900cb45a'
      };
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
      const mockUser: TAuthResponse = {
        success: true,
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmE4ZjU3MTE5ZDQ1MDAxYjUwYTdkMSIsImlhdCI6MTcyNzY5NzA3MiwiZXhwIjoxNzI3Njk4MjcyfQ.Uka7S_ipivarpOCP3m9be8DWsh4rtMWqmRYnxEXRevo',
        refreshToken:
          '1b55437c0a1e00cb95ef4d9e745ae7b34d693265ceb237132c4f6598d8443cc507ecc7e76fce2736',
        user: {
          email: 'kerzolys@yandex.ru',
          name: 'gleb'
        }
      };
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
        user: null,
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
    })
  });
});
