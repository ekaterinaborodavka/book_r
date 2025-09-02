import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  title: string;
  author: string;
  friend: string;
  until: string;
}

const initialState: FormState = {
  title: '',
  author: '',
  friend: '',
  until: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<FormState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearForm() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('books/addItem', () => initialState)
      .addCase('books/showModalFilter', () => initialState);
  },
});

export const { updateForm, clearForm } = formSlice.actions;
export default formSlice.reducer;