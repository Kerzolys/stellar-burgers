import { TIngredient } from '@utils-types';
import modalReducer, {
  closeModal,
  initialState,
  openModal
} from './modalSlice';

describe('тестируем редьюсер модального окна', () => {
  it('проверяем начальное состояние', () => {
    expect(modalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('проверяем открытие модального окна', () => {
    const modalIngredient: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const newState = modalReducer(
      initialState,
      openModal({ item: modalIngredient, type: 'ingredient' })
    );

    expect(newState).toEqual({
      selected: modalIngredient,
      type: 'ingredient',
      isModalOpen: true
    });
  });
  it('проверяем закрытие модального окна', () => {
    const newState = modalReducer(initialState, closeModal());
    expect(newState).toEqual(initialState);
  });
});
