import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '../features/burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from '../features/burgerConstructor/burgerConstructorSlice';
import modalReducer from '../features/modal/modalSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
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
