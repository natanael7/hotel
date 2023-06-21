import "./styles.css";
import MenuManagement from "./menu-management";
import FoodTable from "../components/FoodTable";
import { useState } from "react";
import { FoodsContext } from "./Context";
import {
  typeCategories,
  timeCategories,
  modeType,
  FoodsContextType,
  IPrimitiveFood,
  FoodState,
  ApplicationControlInterface,
  FoodsContextInterface,
} from "../types";

const DEFAULT_FOOD: IPrimitiveFood = {
  title: "Null_Title",
  description: "null_description",
  image: "",
};

const CreateMenu = () => {
  const [item, setItem] = useState<any>(null);
  const [mode, setMode] = useState<modeType>("TABLE");

  const applicationControl: ApplicationControlInterface = {
    item: item,
    setItem: setItem,
    mode: mode,
    setMode: setMode,
  };

  const foodContext: FoodsContextType = {} as FoodsContextType;

  const createFoodsContext = () => {
    typeCategories.forEach((type) => {
      foodContext[type] = {} as any;
      timeCategories.forEach((time) => {
        foodContext[type][time] = Array(3)
          .fill(null)
          .map(() => {
            const [food, setFood] = useState(DEFAULT_FOOD);
            return { food, setFood } as FoodState;
          });
      });
    });
  };

  createFoodsContext();

  const menuContext: FoodsContextInterface = {
    application: applicationControl,
    foods: foodContext,
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "50px",
      className: "image-column",
      showHeader: false,
      render: (image: string) => (
        <img
          src={image.replace("/src", "")}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      ),
    },
  ];

  const handleClickOnRow = (record: IPrimitiveFood) => {
    setItem(record);
    setMode("LIST");
  };

  return (
    <div className="create-menu">
      <div className="page-container">
        <div className={`page-menu ${mode === "TABLE" ? "disabled" : ""}`}>
          <FoodsContext.Provider value={menuContext}>
            <MenuManagement />
          </FoodsContext.Provider>
        </div>
        <div className={`page-table ${mode === "LIST" ? "disabled" : ""}`}>
          <FoodTable columns={columns} handleClickOnRow={handleClickOnRow} />
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
