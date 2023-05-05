import { MouseEventHandler } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  dishname: string;
  setDishname: Function;
  handleButtonClick: MouseEventHandler;
}

export default function SearchElement({
  dishname,
  setDishname,
  handleButtonClick,
}: Props) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Cerca piatti..."
        className="search-input"
        value={dishname}
        onChange={(event) => setDishname(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleButtonClick(event as any);
          }
        }}
      />
      <button
        className="search-button"
        type="submit"
        onClick={handleButtonClick}
      >
        <FaSearch />
      </button>
    </div>
  );
}
