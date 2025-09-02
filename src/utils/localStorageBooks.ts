import { Book } from "../types";
import { books as initialBooks } from "./mockBooks";

const LOCAL_STORAGE_KEY = "books_data";

export const loadBooks = (): Book[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : initialBooks;
  } catch {
    return initialBooks;
  }
};

export const saveBooks = (books: Book[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  } catch {}
};
