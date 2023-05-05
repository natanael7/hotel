export const timeCategories = ["primo", "secondo"] as const;
export const typeCategories = ["pranzo", "cena"] as const;

export type timeType = (typeof timeCategories)[number];
export type typeType = (typeof typeCategories)[number];

export interface PrimitiveFoodInterface {
  title: string;
  description: string;
  image: string;
}
export interface FoodInterface {
  food: PrimitiveFoodInterface;
  time: timeType;
  type: typeType;
  index: number;
}


export interface CourseInterface {
  time: timeType;
  type: typeType;
  course: { options: { title: string; description: string; image: string }[] };
}

export interface MealInterface {
  type: typeType;
  meal: {
    primo: {
      options: {
        title: string;
        description: string;
        image: string;
      }[];
    };
    secondo: {
      options: {
        title: string;
        description: string;
        image: string;
      }[];
    };
  };
}

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
  food: PrimitiveFoodInterface;
  setFood: React.Dispatch<React.SetStateAction<PrimitiveFoodInterface>>;
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
