import { testIngredient } from '../../utils/testConstants';
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
    const mockIngredients: TIngredient[] = [testIngredient];
    const action = {
      type: getIngredientsAsync.fulfilled.type,
      payload: mockIngredients
    };
    const newState = burgerIngredientsReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      loading: false
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
