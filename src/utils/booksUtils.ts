import { Book } from "../types";

const generateId = () => crypto.randomUUID();
type dataBook = Omit<Book, "id">;

export const newItem = (data: dataBook): Book => {
  return {
    id: generateId(),
    ...data,
  };
};

export const addNewItem = (data: dataBook, books: Book[]): Book[] => {
  const { title, author, friend, until } = data;
  if (title && author && friend && until !== "") {
    return [...books, newItem(data)];
  } else {
    return books;
  }
};

export const removeItem = (id: string, books: Book[]): Book[] => {
  return books.filter(el => el.id !== id);
};


export const changeBook = (
  books: Book[],
  updatedFields: Partial<Book>,
  id: string
): Book[] => {
  return books.map(book =>
    book.id === id
      ? { 
          ...book,
          ...Object.entries(updatedFields).reduce((acc, [key, value]) => {
            if (value !== "") acc[key as keyof Book] = value;
            return acc;
          }, {} as Partial<Book>)
        }
      : book
  );
};

export const modalValue = (books: Book[], id: string): Book | null => {
  return books.find(el => el.id === id) ?? null;
};