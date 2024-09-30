import { getIngredientsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

export const getIngredientsAsync = createAsyncThunk<TIngredient[], void>(
  'ingredients/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения данных');
    }
  }
);

type IngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getIngredientsAsync.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
          state.error = null;
        }
      )
      .addCase(getIngredientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const burgerIngredientsSelector = (state: RootState) =>
  state.burgerIngredients.ingredients;
export const loadingSelector = (state: RootState) =>
  state.burgerIngredients.loading;

// export const selectIngredientById = (state: RootState, id?: string) =>
//   state.burgerIngredients.ingredients.find(
//     (ingredient) => ingredient._id === id
//   );

export default burgerIngredientsSlice.reducer;
