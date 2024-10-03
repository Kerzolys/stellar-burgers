import { TIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredient,
  resetAllIngredients
} from './burgerConstructorSlice';
import {
  testBun,
  testConstructorIngredients,
  testIngredient
} from '../../utils/testConstants';
describe('тестируем burgerConstructorSlice', () => {
  describe('тестируем добавление ингридиента в конструктор', () => {
    it('проверяем начальное состояние конструктора', () => {
      expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      );
    });
    it('добавляем ингредиент в конструктор', () => {
      const newIngredient: TIngredient = testIngredient;
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(newIngredient)
      );
      expect(newState.ingredients.length).toEqual(1);
      expect(newState.ingredients[0]).toMatchObject(newIngredient);
    });
  });
  describe('тестируем удаление ингридиента из конструктора', () => {
    const initialTestState: typeof initialState = {
      bun: null,
      ingredients: [testConstructorIngredients[0]],
      isIngredientsLoading: false,
      error: null
    };
    it('удаляем ингредиент из конструктора', () => {
      const newState = burgerConstructorReducer(
        initialTestState,
        removeIngredient('643d69a5c3f7b9001cfa0942')
      );

      expect(newState.ingredients.length).toEqual(0);
    });
  });
  describe('тестируем изменение порядка ингредиентов в конструкторе', () => {
    const initialTestState: typeof initialState = {
      bun: null,
      ingredients: testConstructorIngredients,
      isIngredientsLoading: false,
      error: null
    };
    it('меняем порядок ингредиентов в конструкторе', () => {
      const newState = burgerConstructorReducer(
        initialTestState,
        moveIngredient({ from: 0, to: 1 })
      );

      expect(newState.ingredients[0]).toEqual(initialTestState.ingredients[1]);
      expect(newState.ingredients[1]).toEqual(initialTestState.ingredients[0]);
    });
  });
  describe('тестируем сброс всех ингредиентов в конструкторе', () => {
    const initialTestState: typeof initialState = {
      bun: testBun,
      ingredients: testConstructorIngredients,
      isIngredientsLoading: false,
      error: null
    };
    it('сбрасываем все ингредиенты в конструкторе', () => {
      const newState = burgerConstructorReducer(
        initialTestState,
        resetAllIngredients()
      );

      expect(newState.bun).toBeNull();
      expect(newState.ingredients.length).toEqual(0);
    });
  });
});
