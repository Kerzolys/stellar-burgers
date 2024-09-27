import {
  TFeedsResponse,
  TNewOrderResponse,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../services/store';

type OrderState = {
  order: TOrder | null;
  orders: TOrder[];
  today: number;
  total: number;
  name: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: OrderState = {
  order: null,
  orders: [],
  today: 0,
  total: 0,
  name: null,
  loading: false,
  error: null,
  success: false
};

export const orderBurgerAsync = createAsyncThunk(
  'order/orderBurger',
  async (data: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка заказа');
    }
  }
);

export const getOrdersAsync = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения данных заказов ');
    }
  }
);

export const getAllOrdersAsync = createAsyncThunk<TOrdersData, void>(
  'orders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки данных заказов');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = true;
      })
      .addCase(
        orderBurgerAsync.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.loading = false;
          state.error = null;
          state.order = action.payload.order;
          state.name = action.payload.name;
          state.success = true;
        }
      )
      .addCase(orderBurgerAsync.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(getOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrdersAsync.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload;
          console.log(state.orders);
        }
      )
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllOrdersAsync.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.today = action.payload.totalToday;
          state.total = action.payload.total;
          state.error = null;
        }
      )
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;

export default orderSlice.reducer;
