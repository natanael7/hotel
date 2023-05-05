import "./styles.css";
import { typeCategories } from "../types";

const FULL_RESPONSE = {
  pranzo: {
    primo: {
      options: [
        {
          title: "Canelloni",
          description:
            "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.\n\n",
          image: "/src/img/73ce1bcb-ab10-43a9-8b15-be0f7fe0873a.avif",
        },
        {
          title: "pasta ala matriciana",
          description: "pasta alla matriciana",
          image: "/src/img/d5137045-2709-4380-ae70-60a829d33ce7.jpeg",
        },
        {
          title: "Pasta al pomodoro",
          description:
            "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
          image: "/src/img/33a0e276-7673-46fe-8d3c-60fe3b0ede4a.webp",
        },
      ],
    },
    secondo: {
      options: [
        {
          title: "Scaloppine di polo al limone",
          description:
            "fettine di pollo cotte al limone e servite con riso o contorno a scelta.\n\n",
          image: "/src/img/107695a5-1e6d-4934-829d-bf36e10ea884.jpeg",
        },
        {
          title: "Filetto di sgombro al pane profumato",
          description:
            "filetti di sgombro panati e cotti al forno, serviti con insalata e patate.\n\n",
          image: "/src/img/525045a9-c8bf-4074-856b-059cd3e8f7a3.jpeg",
        },
        {
          title: "Insalata caprese",
          description:
            "un piatto freddo a base di pomodorini, mozzarella e basilico, condito con olio d'oliva e sale.\n\n",
          image: "/src/img/3ea2a5e4-df01-40d7-b64d-223d1125de87.jpeg",
        },
      ],
    },
  },
  cena: {
    primo: {
      options: [
        {
          title: "Minestra di verdure",
          description:
            "una zuppa calda a base di verdure miste, come carote, patate, zucchine e fagioli.\n\n",
          image: "/src/img/f9436e65-6d58-4b9c-bd11-847dca51f9ea.jpeg",
        },
        {
          title: "Spaghetti aglio olio e peperoncino",
          description:
            "pasta condita con olio d'oliva, aglio, peperoncino e prezzemolo.\n\n",
          image: "/src/img/6b9b785a-3157-4e47-9302-3599312d7e53.jpeg",
        },
        {
          title: "Pasta al pomodoro",
          description:
            "pasta semplice condita con salsa di pomodoro fresco e basilico.\n\n",
          image: "/src/img/6bcc790f-4ca0-46a5-9194-fe748330a130.webp",
        },
      ],
    },
    secondo: {
      options: [
        {
          title: "Vitel tone",
          description:
            "fettine di vitello cotte al vino bianco e servite con salsa al rafano e contorno a scelta.\n\n",
          image: "/src/img/3997f104-3c8a-44ed-a46c-445f6dd21221.jpeg",
        },
        {
          title: "Filetto di orata ai pomodorini bicolore",
          description:
            "filetti di orata cotti con pomodorini colorati e aromi, serviti con riso o contorno a scelta.\n\n",
          image: "/src/img/d5b5c3f0-9d0a-4c4d-8793-52b71c7bc509.jpeg",
        },
        {
          title: "Insalata all'avocado",
          description:
            "un piatto freddo a base di avocado, pomodorini, cipolla rossa e condito con olio d'oliva e limone.\n\n",
          image: "/src/img/a4c21006-dc38-4b88-b703-1a343774d003.webp",
        },
      ],
    },
  },
  _id: "64413dd7a3f1fbfc6036a420",
  __v: 0,
};

import MenuSection from "./components/MenuSection";

function OrderPage() {
  const menuElements = typeCategories.map((type, index) => (
    <MenuSection key={index} meal={FULL_RESPONSE[type]} type={type} />
  ));
  return (
    <main className="main">
      <h1 className="menu__title">Menu</h1>

      <section className="menu" id={FULL_RESPONSE._id}>
        {menuElements}
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
        <button className="order-button">Ordina</button>
      </div>
    </main>
  );
}

export default OrderPage;
