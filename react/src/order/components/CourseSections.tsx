import { CourseInterface } from "../../types";
import { capitalize } from "../misc";

import FoodSection from "./FoodSection";

export default function CourseSection({ time, course, type }: CourseInterface) {
  const title = capitalize(time);

  const foodElements = course.options.map((food, index) => (
    <FoodSection
      key={index}
      food={food}
      time={time}
      type={type}
      index={index}
    />
  ));
  return (
    <section className={`menu__${type}-${time}`}>
      <h3 className="menu__subsubtitle">{title}</h3>
      <ul className="menu__list">{foodElements}</ul>
    </section>
  );
}
