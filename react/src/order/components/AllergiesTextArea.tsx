import { useContext } from "react";
import { IPrimitiveOrder, timeType, typeType } from "../../types";
import { OrderContext } from "../OrderContext";

export default function AllergiesTextArea(data: {
  type: typeType;
  time: timeType;
}) {
  const placeholder = `Inserisci eventuali allergeni o preferenze sugli ingredienti, per esempio:
1x Pasta con pomodoro per celiaco
2x Pasta con pesto`;
  const { type, time } = data;
  const orderStateHook = useContext<[IPrimitiveOrder, any]>(OrderContext);
  const [orderState, setOrderState] = orderStateHook;

  function updateState(text: string) {
    console.log(text);
    const updatedState = {
      ...orderState,
      [type]: {
        ...orderState[type],
        [time]: {
          ...orderState[type][time],
          allergies: text,
        },
      },
    };
    setOrderState(updatedState);
  }

  return (
    <textarea
      className="menu__allergen-input"
      placeholder={placeholder}
      id={`${type}-${time}-allergies`}
      defaultValue={""}
      onChange={(event) => updateState(event.target.value)}
    />
  );
}
