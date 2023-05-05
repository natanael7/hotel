import { useContext } from "react";
import {
  timeType,
  typeType,
  FoodsContextInterface,
} from "../../../types";
import { FoodsContext } from "../../Context";

interface PropsInterface {
  time: timeType;
  type: typeType;
  index: number;
}

export default function FoodSection({ time, type, index }: PropsInterface) {
  // FOOOD
  const { foods, application }: FoodsContextInterface | undefined = useContext(
    FoodsContext
  ) as FoodsContextInterface;
  const { food, setFood } = foods[type][time][index];
  const { title, description, image } = food;

  // APPLICATION;
  const { item, setItem, setMode } = application;

  const handleClick = () => {
    setItem(() => setFood(item));
    setMode("TABLE");
  };

  return (
    <li className="menu__item" id={`${type}_${time}_${index}`}>
      <h4 className="menu__item-title">{title}</h4>
      <div className="menu__item-wrapper">
        <img
          className="menu__item-image"
          src={image.replace("/src", "")}
          onClick={handleClick}
          // alt={title}
        />
        <p className="menu__item-description">{description}</p>
      </div>
    </li>
  );
}
