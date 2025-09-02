import { ButtonBook } from "./components/ButtonBook";
import { HeaderBook } from "./components/HeaderBook";
import { TotalBook } from "./components/TotalBook";

import "./app.css";
import { BooksList } from "./components/BooksList";
import { useCallback, useState } from "react";
import { ModalWindowBook } from "./components/ModalWindowBook";
import { useAppSelector } from "./store/hooks";
import { shallowEqual } from "react-redux";

function App() {
  const { books } = useAppSelector((state) => state.books, shallowEqual);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = useCallback(() => {
    setIsModalOpen((show) => !show);
  }, []);

  return (
    <div className="App">
      <HeaderBook />
      <TotalBook total={2} />
      <main className="main">
        <ModalWindowBook isOpen={isModalOpen} onClose={showModal} />
        <BooksList showModal={showModal} books={books} />
      </main>
      <ButtonBook showModal={showModal} />
    </div>
  );
}

export default App;
