import { MouseEventHandler } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  foodname: string;
  setFoodname: Function;
  handleButtonClick: MouseEventHandler;
}

export default function SearchElement({
  foodname,
  setFoodname,
  handleButtonClick,
}: Props) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Cerca piatti..."
        className="search-input"
        value={foodname}
        onChange={(event) => setFoodname(event.target.value)}
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
