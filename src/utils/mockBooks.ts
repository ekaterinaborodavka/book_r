import { Book } from "../types";

const generateId = () => crypto.randomUUID();

export const books: Book[] = [
  {
    id: generateId(),
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    friend: 'Michael Jackson',
    until: '2025-09-16',
  },
  {
    id: generateId(),
    title: 'Arch of Triumph',
    author: 'Erich Maria Remarque',
    friend: 'Sara Li',
    until: '2025-09-22',
  },
];
