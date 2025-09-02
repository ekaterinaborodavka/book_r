import { Plus } from 'lucide-react';

import './button-book.css';

type Props = {
  showModal: () => void;
}

export const ButtonBook = ({ showModal }: Props) => {
  return (
    <footer className="footer">
      <button type="button" className="add_book" onClick={showModal}>
        <Plus size={40} />
        Lend a new book away
      </button>
    </footer>
  );
};
