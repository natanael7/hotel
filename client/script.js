const urlThankYou = "/thank-you.html";
const urlProblem = "/problem.html";
const setId = (element, id) => element.setAttribute("id", id);

const makeNotNullInputsGrey = (input) => {
  if (input.value > 0) input.classList.add("highlight-input");
  else input.classList.remove("highlight-input");
};

async function fetchData() {
  const response = await fetch(url.getMenuLast, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const { pranzo, cena, _id: menuId } = await response.json();
  return { pranzo, cena, menuId };
}

function generateMeals(data) {
  const menu = document.querySelector(".menu");
  console.log(data);
  setId(menu, data.menuId);
  for (const mealType in data) {
    if (mealType == "menuId") return;
    const mealTypeSection = document.createElement("section");
    mealTypeSection.classList.add(`menu__meal`);
    mealTypeSection.classList.add(`menu__${mealType}`);

    const mealTypeTitle = document.createElement("h2");
    mealTypeTitle.classList.add("menu__subtitle");
    mealTypeTitle.textContent =
      mealType.charAt(0).toUpperCase() + mealType.slice(1);
    mealTypeSection.appendChild(mealTypeTitle);

    for (const mealTime in data[mealType]) {
      const mealTimeSection = document.createElement("section");
      mealTimeSection.classList.add(`menu__${mealType}-${mealTime}`);

      const mealTimeTitle = document.createElement("h3");
      mealTimeTitle.classList.add("menu__subsubtitle");
      mealTimeTitle.textContent =
        mealTime.charAt(0).toUpperCase() + mealTime.slice(1);
      mealTimeSection.appendChild(mealTimeTitle);

      const menuList = document.createElement("ul");
      menuList.classList.add("menu__list");

      data[mealType][mealTime].options.forEach((item, index) => {
        const id =
          mealType + "_" + mealTime + "_" + item.title.replace(/ /g, "-");
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
        setId(input, `${mealType}-${mealTime}-quantity-${index}`);
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
      });

      const allergensElement = document.createElement("textarea");
      allergensElement.classList.add("menu__allergen-input");
      allergensElement.placeholder =
        "Inserisci eventuali allergeni o preferenze sugli ingredienti, per esempio:\n1x Pasta con pomodoro per celiaco\n2x Pasta con pesto";
      setId(allergensElement, `${mealType}-${mealTime}-allergies`);

      mealTimeSection.appendChild(menuList);
      mealTimeSection.appendChild(allergensElement);
      mealTypeSection.appendChild(mealTimeSection);
    }

    menu.appendChild(mealTypeSection);
  }
}
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
function getOrder() {
  const generateBlankOrder = () => {
    const obj = {};
    mealTime.map((time) => {
      obj[time] = {};
      mealType.map((type) => {
        obj[time][type] = { options: [], allergies: "" };
      });
    });
    return obj;
  };

  const mealTime = ["pranzo", "cena"];
  const mealType = ["primo", "secondo"];

  const data = {
    order: generateBlankOrder(),
    room: document.querySelector(".room-number-input").value,
    menuId: document.querySelector(".menu").id,
  };

  const quantitySelector = (time, type, index) => {
    return `#${time}-${type}-quantity-${index}`;
  };
  const allergiesSelector = (time, type) => {
    return `#${time}-${type}-allergies`;
  };
  mealTime.map((time) => {
    mealType.map((type) => {
      for (let i = 0; i < 3; i++)
        data.order[time][type].options.push(
          document.querySelector(quantitySelector(time, type, i)).value
        );
      data.order[time][type].allergies = document.querySelector(
        allergiesSelector(time, type)
      ).value;
    });
  });

  return data;
}
function addOrderFunctionality() {
  const onButtonClick = async () => {
    const order = getOrder();
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    try {
      const res = await fetch(url.postOrder, options);
      if (res.ok) window.location.href = urlThankYou;
      else window.location.href = urlProblem;
    } catch (err) {
      window.location.href = urlProblem;
    }
  };
  const orderButton = document.querySelector("button.order-button");
  orderButton.addEventListener("click", onButtonClick);
}

async function main() {
  const data = await fetchData();
  generateMeals(data);
  addCountingFunctionality();
  preventManualChangeInputs();
  addOrderFunctionality();
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
    mealTime.map((time) => {
      mealType.map((type) => {
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

  const mealTime = ["pranzo", "cena"];
  const mealType = ["primo", "secondo"];
  const generateBlankOrder = () => {
    const obj = {};
    mealTime.map((time) => {
      obj[time] = {};
      mealType.map((type) => {
        obj[time][type] = { options: [], allergies: "" };
      });
    });
    return obj;
  };
  const order = generateBlankOrder();

  mealTime.map((time) => {
    mealType.map((type) => {
      order[time][type].options = generateNumbersWithSum(PERSONS);
      order[time][type].allergies = generateAllergiesData(PERSONS);
    });
  });
  order.room = random(100, 600);
  writeData();
}
