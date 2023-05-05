import QtyCounter from "./QtyCounter";
import { FoodInterface } from "../../types";

export default function FoodSection({
  food: { title, description, image },
  time,
  type,
  index,
}: FoodInterface) {
  return (
    <li className="menu__item" id={`${type}_${time}_${index}`}>
      <h4 className="menu__item-title">{title}</h4>
      <div className="menu__item-wrapper">
        <img
          className="menu__item-image"
          src={image.replace("/src", "")}
          alt={title}
        />
        <p className="menu__item-description">{description}</p>
      </div>
      <QtyCounter time={time} type={type} index={index} />
    </li>
  );
}
