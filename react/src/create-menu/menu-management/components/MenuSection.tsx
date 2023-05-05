import { timeCategories, typeType } from "../../../types";
import CourseSection from "./CourseSections";
import { capitalize } from "@material-ui/core";

interface PropsInterface {
  type: typeType;
}

export default function MenuSection({ type }: PropsInterface) {
  const title = capitalize(type);

  const courseElements = timeCategories.map((time, index) => (
    <CourseSection key={index} time={time} type={type} />
  ));

  return (
    <section className={`menu__meal menu__${type}`}>
      <h2 className="menu__subtitle">{title}</h2>
      {courseElements}
    </section>
  );
}
