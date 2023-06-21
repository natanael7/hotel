import "./styles.css";
import { IMenuServer, IPrimitiveOrder, typeCategories } from "../types";
import { GET_MENU_CURRENT } from "../server-functions";
import { OrderContext, defaultOrder } from "./OrderContext";
import MenuSection from "./components/MenuSection";

import { useEffect, useState } from "react";

function OrderPage(): JSX.Element {
  const [menu, setMenu] = useState<IMenuServer>();

  useEffect(() => {
    async function fetchData() {
      const response = await GET_MENU_CURRENT();
      setMenu(response);
    }
    fetchData();
  }, []);

  const sendOrder = async () => {};
  const handleOrderClick = async () => {
    await sendOrder();
  };

  const orderStateHook = useState<IPrimitiveOrder>(defaultOrder);
  // const [orderState, setOrderState] = orderStateHook;

  const menuElements = typeCategories.map(
    (type, index) =>
      menu != undefined && (
        <MenuSection key={index} meal={menu[type]} type={type} />
      )
  );

  return (
    <div className="order-page">
      <main className="main">
        <h1 className="menu__title">Menu</h1>

        <section className="menu" id={menu?._id}>
          <OrderContext.Provider value={orderStateHook}>
            {menuElements}
          </OrderContext.Provider>
        </section>
        <div className="order">
          <input
            required
            type="number"
            placeholder="Numero camera"
            className="room-number-input"
            min="0"
            max="999"
          />
          <button className="order-button" onClick={handleOrderClick}>
            Ordina
          </button>
        </div>
      </main>
    </div>
  );
}

export default OrderPage;
