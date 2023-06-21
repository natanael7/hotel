import "./styles.css";
import SearchMeal from "./components/SearchMeal";
import EditableTable from "../components/EditableTable/";
import { useState } from "react";
import { GET_FOOD } from "../server-functions";
interface APIResponse {
  title: string;
  description: string;
  image: string;
  _id: string;
  v?: number;
}
interface Item extends APIResponse {
  key: React.Key;
}

export default function CreateMeal() {
  const [items, setItems] = useState<Item[]>([]); // Initialize items with an empty array
  const fetchSetItems = async () => {
    try {
      const data: APIResponse[] = await GET_FOOD();
      const formattedData = data.map((el, idx) => ({
        ...el,
        key: idx.toString(),
      }));
      setItems(formattedData); // Update items with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="page-container">
      <div className="page-search">
        <SearchMeal fetchSetItems={fetchSetItems} />
      </div>
      <div className="page-table">
        <EditableTable items={items} fetchSetItems={fetchSetItems} />
      </div>
    </div>
  );
}
