import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addNewItem,
  changeBook,
  removeItem,
} from "../utils/booksUtils";
import { Book } from "../types";
import { loadBooks,saveBooks } from "../utils/localStorageBooks";

interface BookState {
  books: Book[];
  edit: boolean;
  changeElId: string;
  changeEl: Book[];
  checkbox: boolean;
}

const changeElEmpty: Book = {
  id: "",
  title: "",
  author: "",
  friend: "",
  until: "",
};

const initialState: BookState = {
  books: loadBooks(),
  edit: false,
  changeElId: "",
  changeEl: [changeElEmpty],
  checkbox: false,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<Book, "id">>) {
      state.books = addNewItem(action.payload, state.books);
      saveBooks(state.books);
      state.edit = false;
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.books = removeItem(action.payload, state.books);
      saveBooks(state.books);
      state.edit = false;
    },
    changeCheckbox(state) {
      state.checkbox = !state.checkbox;
    },
    changeItem(
      state,
      action: PayloadAction<{ changeElement: Omit<Book, "id">; id: string }>
    ) {
      const { changeElement, id } = action.payload;
      state.books = changeBook(state.books, changeElement, id);
      saveBooks(state.books);
      state.edit = false;
    },
    changeElId(state, action: PayloadAction<string>) {
      state.changeElId = action.payload;
    },
    showModalFilter(
      state,
    ) {
      state.checkbox = false;
      state.changeEl = [changeElEmpty];
    },
    changeEdit(state, action: PayloadAction<boolean>) {
      state.edit = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  changeCheckbox,
  changeItem,
  changeElId,
  showModalFilter,
  changeEdit,
} = bookSlice.actions;

export default bookSlice.reducer;
