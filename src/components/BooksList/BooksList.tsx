

import { Book } from '../../types';
import { BooksListItem } from '../BooksListItem';
import './book-list.css';

type Props = {
  showModal: () => void;
  books: Book[];
}

export const BooksList = ({ books, showModal }: Props) => {
  return (
    <ul className='book_list'>
      {Array.isArray(books) && books.map( (book, index) => {
        return (
          <BooksListItem
            showModal={ showModal }
            book={ book }
            key={ book.id }
            number={index+1}
          />
        );
      })}
    </ul>
  );
}
