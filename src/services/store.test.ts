import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('тестируем rootState', () => {
  describe('проверяем initialState', () => {
    it('проверяем начальное состояние store', () => {
      const store = configureStore({
        reducer: rootReducer
      });
      expect(store.getState()).toEqual({
        burgerIngredients: {
          ingredients: [],
          loading: false,
          error: null
        },
        burgerConstructor: {
          bun: null,
          ingredients: [],
          isIngredientsLoading: false,
          error: null
        },
        modal: {
          selected: null,
          isModalOpen: false,
          type: null
        },
        auth: {
          user: null,
          isAuthenticated: false,
          success: false,
          loading: false,
          error: null
        },
        order: {
          order: null,
          orders: [],
          today: 0,
          total: 0,
          name: null,
          loading: false,
          error: null,
          success: false
        }
      });
    });
  });
});
