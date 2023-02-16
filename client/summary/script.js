const menu = {
  pranzo: {
    primo: {
      options: [
        {
          title: "Cannelloni al profumo di mare",
          description:
            "pasta ripiena di pesce e aromi marini, condita con salsa di pomodoro e besciamella.",
          image: "img/cannelloni al profumo di mare.avif",
        },
        {
          title: "Rigatoni alla amatriciana",
          description:
            "pasta con salsa di pomodoro, guanciale, peperoncino e pecorino romano.",
          image: "img/rigatoni alla amatriciana.jpeg",
        },
        {
          title: "Pasta al pomodoro",
          description:
            "pasta semplice condita con salsa di pomodoro fresco e basilico.",
          image: "img/pasta al pomodoro.webp",
        },
      ],
    },
    secondo: {
      options: [
        {
          title: "Scaloppine di polo al limone",
          description:
            "fettine di pollo cotte al limone e servite con riso o contorno a scelta.",
          image: "img/scaloppine di polo al limone.jpeg",
        },
        {
          title: "Filetto di sgombro al pane profumato",
          description:
            "filetti di sgombro panati e cotti al forno, serviti con insalata e patate.",
          image: "img/filetto di sgombro al pane profumato.jpeg",
        },
        {
          title: "Insalata caprese",
          description:
            "un piatto freddo a base di pomodorini, mozzarella e basilico, condito con olio d'oliva e sale.",
          image: "img/insalata caprese.jpeg",
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
            "una zuppa calda a base di verdure miste, come carote, patate, zucchine e fagioli.",
          image: "img/minestra di verdure.jpeg",
        },
        {
          title: "Spaghetti aglio olio e peperoncino",
          description:
            "pasta condita con olio d'oliva, aglio, peperoncino e prezzemolo.",
          image: "img/spaghetti aglio olio e peperoncino.jpeg",
        },
        {
          title: "Pasta al pomodoro",
          description:
            "pasta semplice condita con salsa di pomodoro fresco e basilico.",
          image: "img/pasta al pomodoro.webp",
        },
      ],
    },
    secondo: {
      options: [
        {
          title: "Vitel tone",
          description:
            "fettine di vitello cotte al vino bianco e servite con salsa al rafano e contorno a scelta.",
          image: "img/vitel tone.jpeg",
        },
        {
          title: "Filetto di orata ai pomodorini bicolore",
          description:
            "filetti di orata cotti con pomodorini colorati e aromi, serviti con riso o contorno a scelta.",
          image: "img/filetto di orata ai pomodorini bicolore.jpeg",
        },
        {
          title: "Insalata all'avocado",
          description:
            "un piatto freddo a base di avocado, pomodorini, cipolla rossa e condito con olio d'oliva e limone.",
          image: "img/insalata all'avocado.webp",
        },
      ],
    },
  },
};
const summary = {
  order: {
    pranzo: {
      primo: {
        options: [82, 45, 47],
        allergeni:
          "\n2x pasta con pesto per celiaco\n\n1x risotto con panna senza lattosio\n2x canneloni con tonno per celiaco\n1x pasta con tonno vegano\n1x pasta con pesto senza lattosio\n1x risotto con panna \n2x canneloni con pesto \n2x pasta con pomodoro \n1x canneloni con tonno \n1x pasta con panna vegano\n1x pasta con tonno \n2x pasta con pesto per celiaco\n1x risotto con pesto \n2x canneloni con pesto vegano\n\n2x pasta con pesto per celiaco\n\n1x risotto con tonno \n1x pasta con pesto vegano\n2x risotto con pesto senza lattosio\n1x risotto con panna \n1x risotto con panna \n3x canneloni con panna per celiaco\n2x canneloni con pomodoro per celiaco\n2x pasta con pomodoro \n1x pasta con pomodoro \n3x canneloni con panna \n1x canneloni con pesto \n2x canneloni con tonno \n3x canneloni con panna senza lattosio\n1x canneloni con tonno \n3x pasta con tonno \n2x pasta con pomodoro senza lattosio\n\nundefined\nundefined\n1x risotto con pesto \n2x risotto con pesto \n4x risotto con pomodoro vegano\n1x pasta con panna senza lattosio\n\n1x risotto con pomodoro \n2x pasta con panna \n1x canneloni con pesto \n3x canneloni con panna \n3x canneloni con pesto per celiaco\n2x pasta con panna \n2x canneloni con panna senza lattosio\n1x canneloni con pomodoro \n1x risotto con panna \n1x risotto con tonno \n1x pasta con pomodoro \n2x pasta con pomodoro \n1x canneloni con pesto \n2x pasta con pomodoro \n",
      },
      secondo: {
        options: [83, 58, 38],
        allergeni:
          "3x risotto con panna senza lattosio\n1x pasta con pesto \n1x canneloni con tonno senza lattosio\n\n2x risotto con tonno senza lattosio\n\n1x canneloni con panna vegano\n1x pasta con pesto vegano\n1x canneloni con pesto \n1x risotto con pesto per celiaco\n1x canneloni con panna senza lattosio\n\n\n3x pasta con pomodoro vegano\n3x canneloni con pomodoro per celiaco\n1x pasta con tonno vegano\n1x pasta con pomodoro per celiaco\n1x risotto con pomodoro \n2x canneloni con panna vegano\n2x canneloni con pomodoro \n2x canneloni con tonno \n\n1x canneloni con panna senza lattosio\n1x canneloni con pesto \n2x canneloni con panna \n2x risotto con pesto per celiaco\n3x pasta con panna \n2x pasta con panna \n3x canneloni con tonno \nundefined\nundefined\n2x pasta con pomodoro \n2x risotto con tonno per celiaco\n1x risotto con pomodoro senza lattosio\n2x pasta con panna \n1x pasta con pomodoro \n1x pasta con pomodoro \n1x risotto con pesto senza lattosio\n4x risotto con pesto \n1x pasta con tonno per celiaco\n3x risotto con tonno senza lattosio\n1x pasta con pesto \n3x canneloni con tonno \n1x risotto con tonno \n1x canneloni con panna vegano\n1x risotto con tonno vegano\n3x risotto con pesto per celiaco\n1x pasta con pomodoro \n1x risotto con panna per celiaco\n2x pasta con tonno \n1x risotto con pesto \n2x risotto con pesto senza lattosio\n2x pasta con pesto \n",
      },
    },
    cena: {
      primo: {
        options: [99, 30, 48],
        allergeni:
          "1x pasta con panna vegano\n3x pasta con panna vegano\n1x risotto con pesto per celiaco\n1x canneloni con tonno \n2x canneloni con tonno \n1x risotto con tonno \n2x canneloni con panna senza lattosio\n3x canneloni con pomodoro vegano\n1x canneloni con pesto \n1x risotto con pomodoro vegano\n3x canneloni con pomodoro senza lattosio\n1x pasta con pomodoro \n\n3x risotto con pomodoro vegano\n2x canneloni con pomodoro \n\n3x pasta con panna per celiaco\n1x pasta con pesto \n1x pasta con panna \n3x pasta con pesto \n5x pasta con tonno vegano\n1x risotto con pomodoro senza lattosio\n3x pasta con pomodoro \n1x canneloni con panna \n2x pasta con pesto \n4x risotto con pomodoro senza lattosio\n1x canneloni con panna \n\n1x pasta con tonno \n1x canneloni con pomodoro senza lattosio\n2x pasta con tonno \n1x canneloni con pesto \n1x canneloni con pomodoro per celiaco\n2x pasta con tonno \n1x risotto con pomodoro per celiaco\n1x canneloni con pesto senza lattosio\nundefined\nundefined\n1x pasta con pesto \n1x risotto con panna \n3x pasta con pesto \n1x pasta con tonno per celiaco\n4x risotto con pesto vegano\n1x canneloni con panna vegano\n1x canneloni con panna \n1x canneloni con tonno senza lattosio\n1x canneloni con panna vegano\n1x canneloni con panna vegano\n1x canneloni con pesto \n1x canneloni con tonno vegano\n1x canneloni con pomodoro \n\n\n2x risotto con pomodoro \n3x risotto con pomodoro senza lattosio\n1x risotto con tonno \n3x risotto con tonno \n",
      },
      secondo: {
        options: [62, 54, 61],
        allergeni:
          "\n2x pasta con panna \n2x pasta con tonno \n1x risotto con pesto \n3x risotto con tonno senza lattosio\n2x pasta con pesto per celiaco\n1x canneloni con panna vegano\n2x pasta con pesto \n1x risotto con pomodoro \n\n1x pasta con panna \n1x canneloni con panna senza lattosio\n3x canneloni con pesto per celiaco\n1x canneloni con pesto senza lattosio\n1x pasta con pomodoro \n\n2x risotto con pomodoro vegano\n1x risotto con pesto \n\n3x canneloni con panna \n1x pasta con panna \n\n2x canneloni con tonno senza lattosio\n1x pasta con pomodoro senza lattosio\n1x pasta con tonno \n1x pasta con pomodoro vegano\n3x pasta con tonno \n2x canneloni con pesto \n3x canneloni con panna vegano\n1x risotto con panna \n1x pasta con panna vegano\n1x pasta con panna senza lattosio\n1x canneloni con panna \n1x pasta con panna senza lattosio\n\nundefined\nundefined\n\n2x risotto con pesto \n2x pasta con panna \n1x pasta con tonno \n3x canneloni con pomodoro senza lattosio\n1x canneloni con pesto vegano\n1x canneloni con panna \n1x canneloni con tonno \n1x canneloni con pesto per celiaco\n1x risotto con panna \n4x risotto con tonno senza lattosio\n2x pasta con panna vegano\n1x pasta con pesto vegano\n1x canneloni con pomodoro \n\n3x canneloni con pesto \n2x canneloni con panna per celiaco\n2x canneloni con pesto vegano\n1x canneloni con tonno \n1x risotto con pomodoro \n1x canneloni con pesto senza lattosio\n",
      },
    },
  },
};
const summaryUrl = "http://127.0.0.1:3000/api/get/order/all/summary";
const menuUrl = "http://127.0.0.1:3000/api/get/menu/current";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const removeDoubleNewLine = (text) => text.replace(/\n+/g, "\n");
function createAndAppendAllergeni(name, parent) {
  const mealContainer = document.createElement("div");
  const meal = document.createElement("div");

  mealContainer.classList.add("container-meal");
  meal.classList.add("meal");
  meal.classList.add("meal-allergeni");

  meal.innerHTML = name;

  mealContainer.appendChild(meal);

  parent.append(mealContainer);
}
function createAndAppendMeal(name, qt, parent) {
  const mealContainer = document.createElement("div");
  const meal = document.createElement("div");
  const mealValue = document.createElement("div");

  mealContainer.classList.add("container-meal");
  meal.classList.add("meal");
  mealValue.classList.add("meal-value");

  meal.innerHTML = name;
  mealValue.innerHTML = qt;

  mealContainer.appendChild(meal);
  mealContainer.appendChild(mealValue);

  parent.append(mealContainer);
}
function createAndAppendTime(name, qt, parent) {
  const timeContainer = document.createElement("div");
  const time = document.createElement("div");
  const timeValue = document.createElement("div");
  const timeLine = document.createElement("hr");

  timeContainer.classList.add("container-time");
  time.classList.add("time");
  timeValue.classList.add("time");
  timeValue.classList.add("time-value");
  timeLine.classList.add("time-line");
  timeLine.classList.add("line");

  time.innerHTML = capitalize(name);
  timeValue.innerHTML = qt;

  timeContainer.appendChild(time);
  timeContainer.appendChild(timeValue);

  parent.append(timeContainer);
  parent.append(timeLine);
}
function createAndAppendType(name, qt, parent) {
  const typeContainer = document.createElement("div");
  const type = document.createElement("div");
  const typeValue = document.createElement("div");
  const typeLine = document.createElement("hr");

  typeContainer.classList.add("container-type");
  type.classList.add("type");
  typeValue.classList.add("type");
  typeValue.classList.add("type-value");
  typeLine.classList.add("type-line");
  typeLine.classList.add("line");

  type.innerHTML = capitalize(name);
  typeValue.innerHTML = qt;

  typeContainer.appendChild(type);
  typeContainer.appendChild(typeValue);

  parent.append(typeContainer);
  parent.append(typeLine);
}
function parseSummary(menu, summary) {
  const pairs = {
    pranzo: {
      primo: { options: [], allergeni: "" },
      secondo: { options: [], allergeni: "" },
    },
    cena: {
      primo: { options: [], allergeni: "" },
      secondo: { options: [], allergeni: "" },
    },
  };
  for (const time in pairs) {
    let timeTotal = 0;
    summary.order[time].primo.options.map((el) => (timeTotal += el));
    summary.order[time].secondo.options.map((el) => (timeTotal += el));

    const parent = document.createElement("div");
    parent.classList.add("pranzo-container");

    createAndAppendTime(time, timeTotal, parent);
    for (const type in pairs[time]) {
      let typeTotal = 0;
      summary.order[time][type].options.map((el) => (typeTotal += el));
      createAndAppendType(type, typeTotal, parent);
      for (let i = 0; i < 3; i++) {
        const mealName = menu[time][type].options[i].title;
        const mealQt = summary.order[time][type].options[i];
        createAndAppendMeal(mealName, mealQt, parent);
      }
    }
    document.querySelector(".main-container").append(parent);
  }
  for (const time in pairs) {
    const parent = document.createElement("div");
    parent.classList.add("pranzo-container");

    createAndAppendTime(time, "fuoricomanda", parent);
    for (const type in pairs[time]) {
      createAndAppendType(type, "", parent);
      createAndAppendAllergeni(
        removeDoubleNewLine(summary.order[time][type].allergeni),
        parent
      );
    }
    document.querySelector(".secondary-container").append(parent);
  }
}
async function main() {
  const menuRes = await fetch(menuUrl);
  const menu = await menuRes.json();

  const summaryRes = await fetch(summaryUrl);
  const summary = await summaryRes.json();
  parseSummary(menu, summary);
}
main();
