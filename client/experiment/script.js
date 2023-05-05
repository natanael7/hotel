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
const blankOrderTemplate = {
  pranzo: {
    primo: { options: [], allergies: null },
    secondo: { options: [], allergies: null },
  },
  // cena: {
  //   primo: { options: [], allergies: null },
  //   secondo: { options: [], allergies: null },
  // },
};
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

function generateUI(data, menu) {
  // Create card element
  const card = document.createElement("div");
  card.classList.add("card");

  // Create title element
  const title = document.createElement("h2");
  title.classList.add("card__title");
  title.textContent = "Camera #" + data.room;
  card.appendChild(title);

  for (const time in blankOrderTemplate)
    for (const type in blankOrderTemplate[time]) {
      const cardTitle = document.createElement("div");
      cardTitle.classList.add("card__title");
      cardTitle.textContent = `${capitalize(time)} - ${capitalize(type)}\n`;
      card.append(cardTitle);

      const cardList = document.createElement("ul");
      cardList.classList.add("card__list");

      const menuData = menu[time][type].options;
      const orderData = data.order[time][type].options;
      const allergens = data.order[time][type].allergies;
      const combinedData = menuData
        .map((el, i) => `${el.title} - ${orderData[i]}pz`)
        .filter((el) => el[el.length - 3] != 0 && el[el.length - 4] == " ")
        .map((el) => {
          const listItem = document.createElement("li");
          listItem.textContent = el;
          cardList.append(listItem);
        });
      card.append(cardList);

      if (allergens != null)
        if (allergens != "") {
          const fuoricomandaTitle = document.createElement("div");
          fuoricomandaTitle.classList.add("card__subtitle");
          fuoricomandaTitle.textContent = "Fuoricomanda:";
          card.append(fuoricomandaTitle);

          const fuoricomanda = document.createElement("div");
          fuoricomanda.classList.add("card__fuoricomanda");
          fuoricomanda.textContent = allergens;
          card.append(fuoricomanda);
        }
    }

  const container = document.querySelector(".card-container");
  container.appendChild(card);
}

async function main() {
  await getData();

  orders
    .sort((a, b) => parseInt(a.room) - parseInt(b.room))
    .map((order) => generateUI(order, menu));
}
main();
