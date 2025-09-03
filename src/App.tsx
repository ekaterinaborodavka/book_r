import { useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

import { ButtonBook } from "./components/ButtonBook";
import { HeaderBook } from "./components/HeaderBook";
import { TotalBook } from "./components/TotalBook";
import { BooksList } from "./components/BooksList";
import { ModalWindowBook } from "./components/ModalWindowBook";
import { useAppSelector } from "./store/hooks";

import "./app.css";

function App() {
  const { books } = useAppSelector((state) => state.books, shallowEqual);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const showModal = useCallback(() => {
    setIsModalOpen((show) => !show);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <div className={`App ${theme}-theme`}>
      <HeaderBook theme={theme} toggleTheme={toggleTheme} />
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
