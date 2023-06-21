import { createContext } from "react";
import { IPrimitiveOrder } from "../types";

export const defaultOrder: IPrimitiveOrder = {
  pranzo: {
    primo: { options: [0, 0, 0], allergies: "" },
    secondo: { options: [0, 0, 0], allergies: "" },
  },
  cena: {
    primo: { options: [0, 0, 0], allergies: "" },
    secondo: { options: [0, 0, 0], allergies: "" },
  },
};
export const OrderContext = createContext<[IPrimitiveOrder, any]>([
  defaultOrder,
  undefined,
]);
