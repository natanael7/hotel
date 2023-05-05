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
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const { id: orderId } = params;
async function getData() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: { $in: orderId.split(" ") } }),
  };
  const orders = (await getOrders(options)).sort(
    (a, b) => parseInt(a.room) - parseInt(b.room)
  );
  const orderRooms = orders.map((el) => el.room);
  const menu = await getMenuCurrent();

  if (!Array.isArray(orders)) throw "Order not found";
  generateTitle(orderRooms);
  orders.map((order) => generateUI(order, menu));
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
          fuoricomanda.textContent = allergens;
          card.append(fuoricomanda);
        }
    }

  const container = document.querySelector(".container");
  container.appendChild(card);
}

function generateTitle(array) {
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = `#: ${array.join(" ")}`;
  document
    .querySelector("body")
    .insertBefore(title, document.querySelector(".container"));
  console.log(array);
}

getData();
