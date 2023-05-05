import { timeType, typeType } from "../../../types";
import { capitalize } from "@material-ui/core";

import FoodSection from "./FoodSection";

interface PropsInterface {
  time: timeType;
  type: typeType;
}

const NR_OF_CHOICES = 3;

export default function CourseSection({ time, type }: PropsInterface) {
  const title = capitalize(time);

  const foodElements = Array(NR_OF_CHOICES)
    .fill(0)
    .map((_, index) => (
      <FoodSection key={index} time={time} type={type} index={index} />
    ));
  return (
    <section className={`menu__${type}-${time}`}>
      <h3 className="menu__subsubtitle">{title}</h3>
      <ul className="menu__list">{foodElements}</ul>
    </section>
  );
}
