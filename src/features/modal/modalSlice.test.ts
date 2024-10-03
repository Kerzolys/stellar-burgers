import { TIngredient } from '@utils-types';
import modalReducer, {
  closeModal,
  initialState,
  openModal
} from './modalSlice';
import { testIngredient } from '../../utils/testConstants';

describe('тестируем редьюсер модального окна', () => {
  it('проверяем начальное состояние', () => {
    expect(modalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('проверяем открытие модального окна', () => {
    const modalIngredient: TIngredient = testIngredient

    const newState = modalReducer(
      initialState,
      openModal({ item: modalIngredient, type: 'ingredient' })
    );

    expect(newState).toEqual({
      ...initialState,
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
