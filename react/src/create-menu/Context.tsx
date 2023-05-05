import { createContext } from "react";
import { FoodsContextInterface } from "../types";

export const FoodsContext = createContext<FoodsContextInterface | undefined>(
  undefined
);
