const blankOrderTemplate = {
  pranzo: {
    primo: { options: [], allergies: null },
    secondo: { options: [], allergies: null },
  },
  cena: {
    primo: { options: [], allergies: null },
    secondo: { options: [], allergies: null },
  },
};
const removeElFromArr = (arr, element) => {
  return arr.filter((el, i) => element != el);
};
async function getData() {
  window.menu = await getMenuCurrent();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ menuId: menu._id }),
  };
  window.orders = await getOrders(options);
  window.mealNames = mealNamesFromMenu(menu);
}
const mealNamesFromMenu = (menu) => {
  const names = {
    pranzo_primo: [],
    pranzo_secondo: [],
    cena_primo: [],
    cena_secondo: [],
  };
  for (const property in names) {
    const meal = property.split("_");
    const mealTime = meal[0];
    const mealType = meal[1];
    names[property] = menu[mealTime][mealType].options.map(
      ({ title }) => title
    );
  }
  return names;
};
let selected = [];
const isSelected = (element) => selected.indexOf(element) != -1;
const removeFromSelected = (element) =>
  (selected = removeElFromArr(selected, element));
const toggleSelected = (element, id) => {
  if (!isSelected(id)) {
    element.classList.add("selected");
    selected.push(id);
  } else {
    element.classList.remove("selected");
    removeFromSelected(id);
  }
};
const onCardClick = (data, event) => {
  toggleSelected(event.target, data._id);
};
const onSendClick = () => {
  window.location = `./multiple.html?id=${selected.join("+")}`;
};

const createCard = (data) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.textContent = data.room;
  div.addEventListener("click", (event) => onCardClick(data, event));
  return div;
};

const generateCard = (data) => {
  const card = createCard(data);
  document.querySelector(".card-container").append(card);
};

async function main() {
  await getData();

  orders.sort((a, b) => parseInt(a.room) - parseInt(b.room)).map(generateCard);

  document.getElementById("send").addEventListener("click", onSendClick);
}
main();

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
