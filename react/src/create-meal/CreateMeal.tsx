import "./styles.css";
import SearchMeal from "./components/SearchMeal";
import EditableTable from "../components/EditableTable/EditableTable";

export default function CreateMeal() {
  return (
    <div className="page-container">
      <div className="page-search">
        <SearchMeal />
      </div>
      <div className="page-table">
        <EditableTable />
      </div>
    </div>
  );
}
