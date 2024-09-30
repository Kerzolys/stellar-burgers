import burgerIngredientsReducer, {
  getIngredientsAsync,
  initialState
} from './burgerIngredientsSlice';
import { TIngredient } from '@utils-types';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const { getIngredientsApi } = require('@api');

describe('тестируем burgerIngredientsSlice', () => {
  it('проверяем начальное состояние', () => {
    expect(burgerIngredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('проверяем запрос асинхронного экшена ', () => {
    const action = { type: getIngredientsAsync.pending.type };
    const newState = burgerIngredientsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });
  it('проверяем успешный результат асинхронного экшена ', async () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '123',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];
    const action = {
      type: getIngredientsAsync.fulfilled.type,
      payload: mockIngredients
    };
    const newState = burgerIngredientsReducer(initialState, action);

    expect(newState).toEqual({
      ingredients: mockIngredients,
      loading: false,
      error: null
    });
  });
  it('проверяем ошибку при асинхронном экшене ', async () => {
    const errorMsg = 'Ошибка получения данных';
    getIngredientsApi.mockRejectedValueOnce(new Error(errorMsg));
    const action = {
      type: getIngredientsAsync.rejected.type,
      payload: errorMsg
    };
    const newState = burgerIngredientsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      error: errorMsg
    });
  });
});
