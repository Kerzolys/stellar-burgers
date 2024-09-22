import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredientWithId: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      if (action.payload.type === 'bun') {
        state.bun = ingredientWithId;
      } else {
        state.ingredients.push(ingredientWithId);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
    resetAllIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetAllIngredients
} = burgerConstructorSlice.actions;
export const burgerConstructorSelector = (state: RootState) =>
  state.burgerConstructor;

export default burgerConstructorSlice.reducer;
