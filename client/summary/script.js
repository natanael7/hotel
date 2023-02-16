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
  const menuRes = await fetch(url.getMenuCurrent);
  const menu = await menuRes.json();

  const summaryRes = await fetch(url.getOrderAllSummary);
  const summary = await summaryRes.json();
  parseSummary(menu, summary);
}
main();
