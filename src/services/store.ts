import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '../features/burgerIngredientsSlice';
import burgerConstructorReducer from '../features/burgerConstructorSlice';
import modalReducer from '../features/modalSlice';
import authReducer from '../features/authSlice';
import orderReducer from '../features/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  auth: authReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
