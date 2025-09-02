import { useCallback } from 'react';

import './book-list-item.css';
import { EllipsisVertical } from 'lucide-react';
import { Book } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { changeEdit, changeElId } from '../../store/bookSlice';

type Props = {
  showModal: () => void;
  book: Book;
  number: number;
}

export const BooksListItem = ({ book, showModal, number }: Props) => {
  const { title, author, friend, until, id } = book;
  const dispatch = useAppDispatch();

  const showChangeModal = useCallback(
      () => {
        showModal();
        dispatch(changeEdit(true));
        dispatch(changeElId(id));
      }, [showModal, id, dispatch],
  );
  return (
    <li className='book_item' >
      <div className='number'>{ number }</div>
      <div className='book_info_wrapper'>
        <div className='book_title'>
          <p className='book_name'>{ title }</p>
          <p className='book_author'>{ author }</p>
        </div>
        <div className='book_info'>
          <p className='book_friend'>{ friend }</p>
          <p className='book_until'>{ until }</p>
        </div>
      </div>
      <div className='book_button_wrapper'>
        <EllipsisVertical onClick={showChangeModal} />
      </div>
    </li>
  );
}
