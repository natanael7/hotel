const POPUP_TITLE = `ORDER SUMMARY`;
const POPUP_TEXT = ``;
import {
  w2popup,
  w2confirm,
} from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";
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

const highlight = (text, additionalClass = "") =>
  `<span class='highlight ${additionalClass}'>` + text + "</span>";
window.createPopup = (menu, data, doYes) => {
  let text = "";
  text += highlight(`Your order for room nr: ${data.room}\n\n`, "bigger");
  for (const time in blankOrderTemplate)
    for (const type in blankOrderTemplate[time]) {
      text += highlight(`${capitalize(time)} - ${capitalize(type)}\n`);
      const menuData = menu[time][type].options;
      const orderData = data.order[time][type].options;
      const allergens = data.order[time][type].allergies;
      const combinedData = menuData
        .map((el, i) => `${el.title} - ${orderData[i]}pz`)
        .filter((el) => el[el.length - 3] != 0 && el[el.length - 4] == " ");
      text += combinedData.join("\n") + "\n\n";
      if (allergens != null)
        if (allergens != "") {
          text += "Fuoricomanda:\n" + allergens + "\n\n";
        }
    }
  w2confirm({
    width: 400,
    height: 600,
    body: text,
  })
    .yes(() => doYes(data))
    .no(() => {});
};
