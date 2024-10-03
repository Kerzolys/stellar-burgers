import orderReducer, {
  initialState,
  getAllOrdersAsync,
  getOrdersAsync,
  orderBurgerAsync
} from './orderSlice';
import { TNewOrderResponse } from '@api';
import {
  testFeed,
  testUserOrder,
  testUserOrders
} from '../../utils/testConstants';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn()
}));

const { getFeedsApi, getOrdersApi, orderBurgerApi } = require('@api');

describe('тестируем orderSlice', () => {
  it('тестируем начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  describe('тестируем асинхронный экшн getAllOrdersAsync', () => {
    it('проверяем запрос получения заказов', () => {
      const action = { type: getAllOrdersAsync.pending.type };
      const newState = orderReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });
    it('проверяем успешный результат получения заказов', async () => {
      const mockOrders = testFeed;
      const action = {
        type: getAllOrdersAsync.fulfilled.type,
        payload: mockOrders
      };

      const newState = await orderReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        orders: mockOrders.orders,
        today: mockOrders.totalToday,
        total: mockOrders.total,
        loading: false,
        error: null
      });
    });
    it('проверяем ошибку при получении заказов', async () => {
      const errorMsg = 'Ошибка загрузки данных заказов';
      getFeedsApi.mockRejectedValueOnce(new Error(errorMsg));
      const action = {
        type: getAllOrdersAsync.rejected.type,
        payload: errorMsg
      };
      const newState = await orderReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: 'Ошибка загрузки данных заказов'
      });
    });
    describe('тестируем экшн getOrdersAsync', () => {
      it('проверяем запрос получения заказов пользователя', () => {
        const action = { type: getOrdersAsync.pending.type };
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          loading: true,
          error: null
        });
      });
      it('проверяем успешный результат получения заказов пользователя', async () => {
        const mockOrders = testUserOrders;
        const action = {
          type: getOrdersAsync.fulfilled.type,
          payload: mockOrders
        };
        const newState = await orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          orders: mockOrders,
          loading: false,
          error: null
        });
      });
      it('проверяем ошибку при получении заказов пользователя', async () => {
        const errorMsg = 'Ошибка получения данных заказов ';
        getOrdersApi.mockRejectedValueOnce(new Error(errorMsg));
        const action = {
          type: getOrdersAsync.rejected.type,
          payload: errorMsg
        };
        const newState = await orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка получения данных заказов '
        });
      });
    });
    describe('тестируем экшн orderBurgerApi', () => {
      it('провеяем запрос создания заказа', () => {
        const action = { type: orderBurgerAsync.pending.type };
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          loading: true,
          error: null,
          success: true
        });
      });
      it('проверяем успешный результат создания заказа', async () => {
        const mockOrder = testUserOrder;

        const action = {
          type: orderBurgerAsync.fulfilled.type,
          payload: mockOrder
        };
        const newState = await orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          order: mockOrder.order,
          name: mockOrder.name,
          loading: false,
          error: null,
          success: true
        });
      });
      it('проверяем ошибку при создании заказа', async () => {
        const errorMsg = 'Ошибка создания заказа';
        orderBurgerApi.mockRejectedValueOnce(new Error(errorMsg));
        const action = {
          type: orderBurgerAsync.rejected.type,
          payload: errorMsg
        };
        const newState = await orderReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          loading: false,
          error: 'Ошибка создания заказа'
        });
      });
    });
  });
});
