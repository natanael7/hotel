import { useState } from "react";
import { timeType, typeType } from "../../types";

export default function QtyCounter({
  time,
  type,
  index,
}: {
  time: timeType;
  type: typeType;
  index: number;
}) {
  const [count, setCount] = useState(0);

  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value === "0") {
      setCount(0);
    } else {
      const nonZeroValue = value.replace(/^0+/, "");
      setCount(Number(nonZeroValue));
      event.target.value = nonZeroValue;
    }
  };

  return (
    <div className="menu__item-quantity">
      <button
        className="menu__item-quantity-minus menu__item-quantity-change"
        onClick={handleMinusClick}
      >
        -
      </button>
      <input
        className="menu__item-quantity-input"
        type="number"
        min={0}
        value={count}
        onChange={handleInputChange}
        id={`${type}-${time}-quantity-${index}`}
        inputMode="numeric"
      />
      <button
        className="menu__item-quantity-plus menu__item-quantity-change"
        onClick={handlePlusClick}
      >
        +
      </button>
    </div>
  );
}
