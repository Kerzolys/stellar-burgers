import { TOrder, TOrdersData } from '@utils-types';
import orderReducer, {
  initialState,
  getAllOrdersAsync,
  getOrdersAsync,
  orderBurgerAsync
} from './orderSlice';
import { TNewOrderResponse } from '@api';

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
      const mockOrders = {
        orders: [
          {
            _id: '66fa426e119d45001b50a6d4',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0940'
            ],
            status: 'done',
            name: 'Флюоресцентный метеоритный бургер',
            createdAt: '2024-09-30T06:17:18.765Z',
            updatedAt: '2024-09-30T06:17:19.596Z',
            number: 54644
          },
          {
            _id: '66fa4255119d45001b50a6d3',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093f'
            ],
            status: 'done',
            name: 'Краторный бессмертный бургер',
            createdAt: '2024-09-30T06:16:53.122Z',
            updatedAt: '2024-09-30T06:16:53.980Z',
            number: 54643
          }
        ],
        total: 54318,
        totalToday: 118
      };
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
        const mockOrders = [
          {
            _id: '66fa426e119d45001b50a6d4',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0940'
            ],
            status: 'done',
            name: 'Флюоресцентный метеоритный бургер',
            createdAt: '2024-09-30T06:17:18.765Z',
            updatedAt: '2024-09-30T06:17:19.596Z',
            number: 54644
          }
        ];
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
        const mockOrder = {
          name: 'Краторный люминесцентный бургер',
          order: {
            ingredients: [
              {
                _id: '643d69a5c3f7b9001cfa093e',
                name: 'Филе Люминесцентного тетраодонтимформа',
                type: 'main',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/meat-03.png',
                image_mobile:
                  'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                image_large:
                  'https://code.s3.yandex.net/react/code/meat-03-large.png',
                __v: 0
              },
              {
                _id: '643d69a5c3f7b9001cfa093c',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                  'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                  'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0
              }
            ],
            _id: '66fa3580119d45001b50a6bc',
            owner: {
              name: 'Gleb Khokhlov',
              email: 'kerzolys@gmail.com',
              createdAt: '2024-09-18T14:53:58.967Z',
              updatedAt: '2024-09-22T11:03:25.417Z'
            },
            status: 'done',
            name: 'Краторный люминесцентный бургер',
            createdAt: '2024-09-30T05:22:08.981Z',
            updatedAt: '2024-09-30T05:22:09.857Z',
            number: 54637,
            price: 2243
          }
        };

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
