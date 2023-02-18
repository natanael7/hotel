const ALLERGIES_PLACEHOLDER =
  "Inserisci eventuali allergeni o preferenze sugli ingredienti, per esempio:\n1x Pasta con pomodoro per celiaco\n2x Pasta con pesto";

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
const loop = (callback) => {
  const time = ["pranzo", "cena"];
  const type = ["primo", "secondo"];
  time.map((tm) => {
    type.map((tp) => {
      callback(tm, tp);
    });
  });
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const setId = (element, id) => element.setAttribute("id", id);

const makeNotNullInputsGrey = (input) => {
  if (input.value > 0) input.classList.add("highlight-input");
  else input.classList.remove("highlight-input");
};
const quantitySelector = (time, type, index) => {
  return `#${time}-${type}-quantity-${index}`;
};
const allergiesSelector = (time, type) => {
  return `#${time}-${type}-allergies`;
};

// -----  GENERATE MEALS FUNCTIONS  -----
const createTypeSection = (type) => {
  const element = document.createElement("section");
  element.classList.add(`menu__meal`);
  element.classList.add(`menu__${type}`);
  return element;
};
const createTypeTitle = (type) => {
  const element = document.createElement("h2");
  element.classList.add("menu__subtitle");
  element.textContent = capitalize(type);
  return element;
};

const createTimeSection = (type, time) => {
  const element = document.createElement("section");
  element.classList.add(`menu__${type}-${time}`);
  return element;
};

const createTimeTitle = (time) => {
  const element = document.createElement("h3");
  element.classList.add("menu__subsubtitle");
  element.textContent = capitalize(time);
  return element;
};

const createMenuList = () => {
  const element = document.createElement("ul");
  element.classList.add("menu__list");
  return element;
};

const createMeal = (item, index, type, time, menuList) => {
  const id = type + "_" + time + "_" + item.title.replace(/ /g, "-");
  const menuItem = document.createElement("li");
  menuItem.classList.add("menu__item");
  menuItem.id = id;

  const menuItemTitle = document.createElement("h4");
  menuItemTitle.classList.add("menu__item-title");
  menuItemTitle.textContent = item.title;
  menuItem.appendChild(menuItemTitle);

  const menuItemWrapper = document.createElement("div");
  menuItemWrapper.classList.add("menu__item-wrapper");

  const menuItemImage = document.createElement("img");
  menuItemImage.classList.add("menu__item-image");
  menuItemImage.src = item.image;
  menuItemImage.alt = item.title;
  menuItemWrapper.appendChild(menuItemImage);

  const menuItemDescription = document.createElement("p");
  menuItemDescription.classList.add("menu__item-description");
  menuItemDescription.textContent = item.description;
  menuItemWrapper.appendChild(menuItemDescription);

  menuItem.appendChild(menuItemWrapper);

  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("menu__item-quantity");
  const minusBtn = document.createElement("button");
  minusBtn.classList.add(
    "menu__item-quantity-minus",
    "menu__item-quantity-change"
  );
  minusBtn.innerHTML = "-";
  quantityDiv.appendChild(minusBtn);
  const input = document.createElement("input");
  input.classList.add("menu__item-quantity-input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "0");
  input.setAttribute("value", "0");
  setId(input, `${type}-${time}-quantity-${index}`);
  quantityDiv.appendChild(input);
  const plusBtn = document.createElement("button");
  plusBtn.classList.add(
    "menu__item-quantity-plus",
    "menu__item-quantity-change"
  );
  plusBtn.innerHTML = "+";

  quantityDiv.appendChild(plusBtn);

  menuItem.appendChild(quantityDiv);

  menuList.appendChild(menuItem);
};
const createAllergens = () => {
  const element = document.createElement("textarea");
  element.classList.add("menu__allergen-input");
  element.placeholder = ALLERGIES_PLACEHOLDER;
  return element;
};

function generateMeals(data) {
  const menu = document.querySelector(".menu");
  const menuId = data._id;

  // Set the id for the menu container that further will be used to post the orders
  // The orders are requiered to have a menuId to be able to identify what was ordered
  setId(menu, menuId);

  for (const type in blankOrderTemplate) {
    const typeSection = createTypeSection(type);
    const typeTitle = createTypeTitle(type);

    typeSection.appendChild(typeTitle);

    for (const time in blankOrderTemplate[type]) {
      const timeSection = createTimeSection(type, time);
      const timeTitle = createTimeTitle(time);

      timeSection.appendChild(timeTitle);

      const menuList = createMenuList();

      data[type][time].options.map((el, i) =>
        createMeal(el, i, type, time, menuList)
      );

      const allergensElement = createAllergens();
      setId(allergensElement, `${type}-${time}-allergies`);

      timeSection.appendChild(menuList);
      timeSection.appendChild(allergensElement);

      typeSection.appendChild(timeSection);
    }
    menu.appendChild(typeSection);
  }
}
// -----  END OF GENERATE MEALS FUNCTIONS  -----

// -----  GET ORDER DATA FUNCTIONS  -----
function getOrder() {
  const data = {
    order: blankOrderTemplate,
    room: document.querySelector(".room-number-input").value,
    menuId: document.querySelector(".menu").id,
  };

  const getDataFromOneMeal = (time, type) => {
    for (let i = 0; i < 3; i++)
      data.order[time][type].options.push(
        document.querySelector(quantitySelector(time, type, i)).value
      );
    data.order[time][type].allergies = document.querySelector(
      allergiesSelector(time, type)
    ).value;
  };

  loop(getDataFromOneMeal);
  console.log(data);
  return data;
}
// -----  END OF GET ORDER DATA FUNCTIONS  -----
function addCountingFunctionality() {
  const minusButtons = document.querySelectorAll(".menu__item-quantity-minus");
  const plusButtons = document.querySelectorAll(".menu__item-quantity-plus");

  minusButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const input = event.target.nextElementSibling;
      if (parseInt(input.value) > 0) input.value = parseInt(input.value) - 1;
      makeNotNullInputsGrey(input);
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const input = event.target.previousElementSibling;
      input.value = parseInt(input.value) + 1;
      makeNotNullInputsGrey(input);
    });
  });
}
function preventManualChangeInputs() {
  const inputs = document.querySelectorAll(".menu__item-quantity-input");
  inputs.forEach((input) =>
    input.addEventListener("change", () => {
      makeNotNullInputsGrey(input);
    })
  );
}
// -----  ORDER BUTTON FUNCTIONS  -----

const makePopUpOrderSummary = async (menu) => {
  const data = getOrder();
  createPopup(menu, data, pushOrderToServer);
};
const pushOrderToServer = async (order) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    const res = await postOrder(options, true);
    if (res.ok) window.location.href = THANK_YOU_URL;
    else window.location.href = PROBLEM_URL;
  } catch (err) {
    window.location.href = PROBLEM_URL;
  }
};
function addOrderFunctionality(menu) {
  const orderButton = document.querySelector("button.order-button");
  orderButton.addEventListener("click", () => {
    if (formValidation()) makePopUpOrderSummary(menu);
  });
}
// -----  END OF ORDER BUTTON FUNCTIONS  -----
function formValidation() {
  let room = document.querySelector(".room-number-input").value;
  if (room == "") {
    document.querySelector(".room-number-input").style.border = "1px solid red";
    document.querySelector(".room-number-input").style.backgroundColor =
      "#eec4dc";
    alert("Perfavore scrivi numero camera");
    return false;
  }
  return true;
}

async function main() {
  const data = await getMenuLast();

  generateMeals(data);
  addCountingFunctionality();
  preventManualChangeInputs();
  addOrderFunctionality(data);
  generateDummyData();
  // document.querySelector(".order-button").click();
}

main();

function generateDummyData() {
  const PERSONS = 5;
  const PROBABILITY = 0.4;
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomOf = (arr) => arr[random(0, arr.length - 1)];
  const randomBinnary = () => random(0, 1);
  const generateNumbersWithSum = (n, nrs = 3) => {
    const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);
    const result = [];
    for (let i = 0; i < nrs; i++) {
      let nr = n - sum(result);
      if (i + 1 != nrs) nr = random(0, nr);
      result.push(nr);
    }
    return result;
  };
  const generateAllergiesData = (maxPeople) => {
    const allergyPeople =
      Math.random() < PROBABILITY ? random(0, maxPeople) : 0;

    const what = ["pasta", "risotto", "canneloni"];
    const withWhat = ["con pomodoro", "con pesto", "con tonno", "con panna"];
    const forWhom = ["per celiaco", "senza lattosio", "vegano"];

    const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

    const quantities = [];
    while (sum(quantities) != allergyPeople) {
      const nr = random(1, allergyPeople - sum(quantities));
      quantities.push(nr);
    }
    const makeMeal = (nr = 1) =>
      `${nr}x ${randomOf(what)} ${randomOf(withWhat)} ${
        randomBinnary() ? randomOf(forWhom) : ""
      }`;
    return quantities.map(makeMeal).join("\n");
  };

  const writeData = () => {
    time.map((time) => {
      type.map((type) => {
        order[time][type].options.map((el, index) => {
          const qtySelector = `#${time}-${type}-quantity-${index}`;
          document.querySelector(qtySelector).value = el;
        });
        const allergiesSelector = `#${time}-${type}-allergies`;
        document.querySelector(allergiesSelector).value =
          order[time][type].allergies;
      });
    });
    const roomSelector = ".room-number-input";
    document.querySelector(roomSelector).value = order.room;
  };

  const time = ["pranzo", "cena"];
  const type = ["primo", "secondo"];
  const generateBlankOrder = () => {
    const obj = {};
    time.map((time) => {
      obj[time] = {};
      type.map((type) => {
        obj[time][type] = { options: [], allergies: "" };
      });
    });
    return obj;
  };
  const order = generateBlankOrder();

  time.map((time) => {
    type.map((type) => {
      order[time][type].options = generateNumbersWithSum(PERSONS);
      order[time][type].allergies = generateAllergiesData(PERSONS);
    });
  });
  order.room = random(100, 600);
  writeData();
}
