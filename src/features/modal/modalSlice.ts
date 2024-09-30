import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from '../../services/store';

type ModalType = 'ingredient' | 'order';

type ModalState = {
  selected: TIngredient | TOrder | null;
  isModalOpen: boolean;
  type: ModalType | null;
};

export const initialState: ModalState = {
  selected: null,
  isModalOpen: false,
  type: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        item: TIngredient | TOrder;
        type: ModalType;
      }>
    ) => {
      state.selected = action.payload.item;
      state.type = action.payload.type;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selected = null;
      state.type = null;
      state.isModalOpen = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalSelector = (state: RootState) => state.modal;

export default modalSlice.reducer;
