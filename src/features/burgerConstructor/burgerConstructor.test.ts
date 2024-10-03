import { TIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredient,
  resetAllIngredients
} from './burgerConstructorSlice';
describe('тестируем burgerConstructorSlice', () => {
  describe('тестируем добавление ингридиента в конструктор', () => {
    it('проверяем начальное состояние конструктора', () => {
      expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      );
    });
    it('добавляем ингредиент в конструктор', () => {
      const newIngredient: TIngredient = {
        _id: '643d69a5c3f7b9001cfa0942',
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
      };
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
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0942',
          id: '643d69a5c3f7b9001cfa0942',
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
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        }
      ],
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
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0942',
          id: '643d69a5c3f7b9001cfa0942',
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
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          id: '643d69a5c3f7b9001cfa093e',
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
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        }
      ],
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
      bun: {
        _id: '643d69a5c3f7b9001cfa093c',
        id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0942',
          id: '643d69a5c3f7b9001cfa0942',
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
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          id: '643d69a5c3f7b9001cfa093e',
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
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        }
      ],
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
