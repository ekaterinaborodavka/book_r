import { Moon, Sun } from "lucide-react";
import "./header-book.css";

type Props = {
  toggleTheme: () => void;
  theme: "light" | "dark";
};

export const HeaderBook = ({ toggleTheme, theme }: Props) => {
  return (
    <header className="header">
      <div className="theme-switch_wrapper">
        <span className="theme-text">
          {theme === "light" ? (
            <>
              <Sun size={15} /> Light
            </>
          ) : (
            <>
              <Moon size={15} /> Dark
            </>
          )}
        </span>
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>
      <h1 className="title">Books that I have lent to friends</h1>
    </header>
  );
};
