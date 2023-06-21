import OrderPage from "./order";
import CreateMeal from "./create-meal";
import ManageMeals from "./create-menu";
import { useState } from "react";
import { Menu } from "antd";
import { CustomAlert } from "./components/CustomAlert";
enum Page {
  Order,
  Create,
  Manage,
}
type AlertType = "success" | "info" | "warning" | "error" | "hidden";
interface AlertStateInterface {
  text: string;
  type: AlertType;
}
const DEFAULT_ALERT_STATE: AlertStateInterface = { text: "", type: "hidden" };

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Order);

  const [alertState, setAlertState] =
    useState<AlertStateInterface>(DEFAULT_ALERT_STATE);

  const showAlert = (text: string, type: AlertType) => {
    setAlertState({ text, type });
    setTimeout(() => {
      setAlertState({ text, type: "hidden" });
    }, 2000);
  };

  const handleMenuClick = (event: any) => {
    setPage(Number(event.key));
  };

  return (
    <div>
      <CustomAlert {...alertState} />
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[String(page)]}
        mode="horizontal"
      >
        <Menu.Item key={Page.Order}>Order</Menu.Item>
        <Menu.Item key={Page.Create}>Create Meal</Menu.Item>
        <Menu.Item key={Page.Manage}>Create Menu</Menu.Item>
      </Menu>
      {page === Page.Order && <OrderPage />}
      {page === Page.Create && <CreateMeal />}
      {page === Page.Manage && <ManageMeals />}
    </div>
  );
};

export default App;
