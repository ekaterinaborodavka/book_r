import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { shallowEqual } from "react-redux";
import { OctagonAlert } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./modal-window-book.css";
import {
  addItem,
  changeCheckbox,
  changeItem,
  deleteItem,
  showModalFilter,
} from "../../store/bookSlice";
import { updateForm } from "../../store/formSlice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalWindowBook = ({ isOpen, onClose }: Props) => {
  const [error, setError] = useState(false);
  const { books, edit, changeElId, checkbox } = useAppSelector(
    (state) => state.books,
    shallowEqual
  );
  const form = useAppSelector((state) => state.form, shallowEqual);
  const dispatch = useAppDispatch();

  const { title, author, friend, until } = form;

  const changeEl = books.find((book) => book.id === changeElId) ?? null;

  useEffect(() => {
    if (edit && changeEl) {
      dispatch(
        updateForm({
          title: changeEl.title,
          author: changeEl.author,
          friend: changeEl.friend,
          until: changeEl.until,
        })
      );
    } else {
      dispatch(updateForm({ title: "", author: "", friend: "", until: "" }));
    }
  }, [edit, changeEl, dispatch]);

  const onCloseModal = () => {
    onClose();
    setError(false);
  };

  const addBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edit) {
      if (!form.title || !form.author || !form.friend || !form.until) {
        setError(true);
        return;
      }
      dispatch(addItem(form));
    } else if (checkbox) {
      dispatch(deleteItem(changeElId));
    } else {
      dispatch(changeItem({ changeElement: form, id: changeElId }));
    }
    dispatch(showModalFilter());
    onCloseModal();
  };

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateForm({
          [e.target.name]: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const onCheckbox = useCallback(() => {
    dispatch(changeCheckbox());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Lending a book away</h3>
        <form className="modal-form" onSubmit={addBook}>
          <input
            id="title_book"
            className="book"
            name="title"
            value={title}
            placeholder={"Title of the book:"}
            type="text"
            onChange={onInputChange}
          />
          <input
            id="title_friend"
            className="friend"
            name="friend"
            value={friend}
            placeholder={"Lent to friend:"}
            type="text"
            onChange={onInputChange}
          />
          <input
            id="title_author"
            className="author"
            name="author"
            value={author}
            placeholder={"Author"}
            type="text"
            onChange={onInputChange}
          />
          <input
            id="title_until"
            className="until"
            name="until"
            value={until}
            placeholder={"Until"}
            type="date"
            onChange={onInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
          {edit ? (
            <div className="checkbox">
              <input
                id="title_checkbox"
                type="checkbox"
                checked={checkbox}
                onChange={onCheckbox}
              />
              <label htmlFor="title_checkbox">
                <span className="custom-checkmark"></span>
                Book has been returned back
              </label>
            </div>
          ) : null}
          {error && (
            <p className="error">
              <OctagonAlert /> All fields must be filled in
            </p>
          )}
          <div className="buttons">
            <button type="button" className="cancel" onClick={onCloseModal}>
              Cancel
            </button>
            <button className="save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
