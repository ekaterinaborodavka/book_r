import './total-book.css';

type Props = {
  total: number;
}

export const TotalBook = ({ total }: Props) => {
  return (
    <div className='total_info'>
      <span className='total_book'>You have lent { total } books to friends</span>
      <span className='total_lent'>Lent to:</span>
    </div>
  );
};

