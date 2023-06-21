import { Dispatch, SetStateAction } from "react";

export const timeCategories = ["primo", "secondo"] as const;
export const typeCategories = ["pranzo", "cena"] as const;

export type timeType = (typeof timeCategories)[number];
export type typeType = (typeof typeCategories)[number];

// FOOD -> COURSE -> MEAL -> MENU

// ----   PRIMITIVES   ----
export interface IPrimitiveFood {
  title: string;
  description: string;
  image: string;
}
export interface IPrimitiveCourse {
  options: IPrimitiveFood[];
}
export interface IPrimitiveMeal {
  primo: IPrimitiveCourse;
  secondo: IPrimitiveCourse;
}
export interface IPrimitiveMenu {
  pranzo: IPrimitiveMeal;
  cena: IPrimitiveMeal;
}

// ----   ORDER DATA   ----
interface IOrderDataCourse {
  options: [number, number, number];
  allergies: string;
}
interface IOrderDataMeal {
  primo: IOrderDataCourse;
  secondo: IOrderDataCourse;
}
export interface IPrimitiveOrder {
  pranzo: IOrderDataMeal;
  cena: IOrderDataMeal;
}

// ----   APPLICATION USED   ----
export interface IFood {
  food: IPrimitiveFood;
  time: timeType;
  type: typeType;
  index: number;
}
export interface ICourse {
  time: timeType;
  type: typeType;
  course: IPrimitiveCourse;
}
export interface IMeal {
  type: typeType;
  meal: IPrimitiveMeal;
}
export interface IOrder {
  room: number;
  menuId: string;
  order: IPrimitiveOrder;
}

// ----   SERVER    ----
export interface IFoodServer extends IPrimitiveFood {
  _id: string;
  v: number;
}
export interface IMenuServer extends IPrimitiveMenu {
  _id: string;
  v: number;
}

// ----   OTHER...    ----
export interface ImageInterface {
  src: string;
  fallback: string;
}

export interface ApplicationControlInterface {
  item: any;
  setItem: React.Dispatch<React.SetStateAction<any>>;
  mode: modeType;
  setMode: React.Dispatch<React.SetStateAction<modeType>>;
}

export interface FoodState {
  food: IPrimitiveFood;
  setFood: React.Dispatch<React.SetStateAction<IPrimitiveFood>>;
}

export interface FoodsContextInterface {
  foods: FoodsContextType;
  application: ApplicationControlInterface;
}

export type FoodsContextType = {
  [K in typeType]: {
    [T in timeType]: FoodState[];
  };
};

export const modeCategories = ["TABLE", "LIST"] as const;
export type modeType = (typeof modeCategories)[number];

export type TOrderHook = [
  IPrimitiveOrder,
  Dispatch<SetStateAction<IPrimitiveOrder>>
];
