import { IMeal, timeCategories } from "../../types";
import { capitalize } from "../misc";
import CourseSection from "./CourseSections";
import AllergiesTextArea from "./AllergiesTextArea";




export default function MenuSection({ type, meal }: IMeal) {
  const title = capitalize(type);

  const courseElements = timeCategories.map((time, index) => (
    <>
      <CourseSection key={index} time={time} type={type} course={meal[time]} />
      <AllergiesTextArea type={type} time={time} />
    </>
  ));

  return (
    <section className={`menu__meal menu__${type}`}>
      <h2 className="menu__subtitle">{title}</h2>
      {courseElements}
    </section>
  );
}
