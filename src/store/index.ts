import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import formReducer from './formSlice';

export const store = configureStore({
    reducer: {
      books: bookReducer,
      form: formReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;