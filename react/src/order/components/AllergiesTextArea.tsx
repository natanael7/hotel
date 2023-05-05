import { timeType, typeType } from "../../types";

export default function AllergiesTextArea(data: {
  type: typeType;
  time: timeType;
}) {
  const placeholder = `Inserisci eventuali allergeni o preferenze sugli ingredienti, per esempio:
1x Pasta con pomodoro per celiaco
2x Pasta con pesto`;
  const { type, time } = data;

  return (
    <textarea
      className="menu__allergen-input"
      placeholder={placeholder}
      id={`${type}-${time}-allergies`}
      defaultValue={""}
    />
  );
}
