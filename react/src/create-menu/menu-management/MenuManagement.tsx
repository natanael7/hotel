import "./styles.css";
import { typeCategories } from "../../types";

import MenuSection from "./components/MenuSection";

function MenuManagement() {
  const menuElements = typeCategories.map((type, index) => (
    <MenuSection key={index} type={type} />
  ));
  return (
    <main className="main">
      <section className="menu">{menuElements}</section>
    </main>
  );
}

export default MenuManagement;
