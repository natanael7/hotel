const REQUIRED = { image: true, title: true, description: true };
const GLOBAL_PREFIX = "../upload/";

class Food {
  constructor({ title = null, description = null, image = null }) {
    this.title = title;
    this.description = description;
    this.image = image;
    if (this.title == "") this.title = null;
    if (this.description == "") this.description = null;
    if (this.image == "") this.image = null;
  }
}
class Course {
  constructor({ options }) {
    this.options = [];
    options.map((el) => this.options.push(new Food(el)));
  }
}
class Meal {
  constructor({ primo, secondo }) {
    this.primo = new Course(primo);
    this.secondo = new Course(secondo);
  }
}
class Menu {
  constructor({ pranzo, cena }) {
    this.pranzo = new Meal(pranzo);
    this.cena = new Meal(cena);
  }
  loop(mealType, mealTime, callback) {
    this[mealType][mealTime].options.map(callback);
  }
  loopAll(callback) {
    this.loop("pranzo", "primo", callback);
    this.loop("pranzo", "secondo", callback);
    this.loop("cena", "primo", callback);
    this.loop("cena", "secondo", callback);
  }
  files() {
    const arr = [];
    const callback = (el) => arr.push(el.image);
    this.loopAll(callback);
    const res = arr.filter((file) => {
      if (file == null) return false;
      if (file == undefined) return false;

      if (file.constructor == File) return true;

      return false;
    });

    console.log(res);
    return res;
  }
  applyIDs(ids = []) {
    if (!Array.isArray(ids)) return;
    if (ids.length == 0) return;
    const applyID = (el) => {
      if (el.image == null) return;
      if (el.image.constructor == File) el.image = ids.shift();
    };
    this.loopAll(applyID);
  }
}
const highlighNonEmptyInputs = () => {
  const highlightClass = "highlightInput";
  const checkIfNotEmpty = (el) =>
    !(el.value == "" || el.value == el.defaultValue);
  const highlight = (el) => {
    if (checkIfNotEmpty(el)) el.classList.add(highlightClass);
    else el.classList.remove(highlightClass);
  };
  const inputs = document.querySelectorAll("input,textarea");

  inputs.forEach(
    (el) => (el.oninput = el.onpaste = el.oncut = () => highlight(el))
  );
};
const getDataFromInputs = () => {
  const data = {
    pranzo: {
      primo: { options: [] },
      secondo: { options: [] },
    },
    cena: {
      primo: { options: [] },
      secondo: { options: [] },
    },
  };
  const pushData = (meal, order) => {
    for (let i = 0; i < 3; i++) {
      const title = document.getElementById(
        `${meal}-${order}-${i + 1}-title`
      ).value;
      const description = document.getElementById(
        `${meal}-${order}-${i + 1}-description`
      ).value;
      const image = document.getElementById(
        `${meal}-${order}-${i + 1}-imageInput`
      ).files[0];
      const imageFromSrc = document
        .getElementById(`${meal}-${order}-${i + 1}-image`)
        .getAttribute("src");

      let selectedImage = image;

      if (image == undefined && imageFromSrc != null)
        selectedImage = imageFromSrc.replace(GLOBAL_PREFIX, "");
      data[meal][order].options.push(
        new Food({ title, description, image: selectedImage })
      );
    }
  };
  pushData("pranzo", "primo");
  pushData("pranzo", "secondo");
  pushData("cena", "primo");
  pushData("cena", "secondo");

  return data;
};

const uploadFilesToServer = async (files) => {
  if (files.length == 0) return [];
  const formData = new FormData();
  files.map((file) => formData.append("images", file));

  const options = {
    method: "POST",
    body: formData,
  };

  const res = await (await fetch(url.uploadFiles, options)).json();
  return res;
};
function clearData() {
  console.log(1);
  const menu = {
    pranzo: { primo: [], secondo: [] },
    cena: { primo: [], secondo: [] },
  };
  for (const time in menu)
    for (const type in menu[time])
      for (let i = 0; i < 3; i++) {
        document.querySelector(`#${time}-${type}-${i + 1}-title`).value = "";

        document.querySelector(`#${time}-${type}-${i + 1}-description`).value =
          "";
        // if (document.querySelector(`#${time}-${type}-${i + 1}-image`).hasAttribute("src"))
        document
          .querySelector(`#${time}-${type}-${i + 1}-image`)
          .removeAttribute("src");
      }
}
async function saveData() {
  const data = getDataFromInputs();

  const menu = new Menu(data);

  const files = menu.files();

  const fileIDs = await uploadFilesToServer(files);

  menu.applyIDs(fileIDs);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  };

  fetch(url.postLocalMenu, options);
}
async function getAndWriteSavedData() {
  const res = await fetch(url.getLocalMenuLast);
  const data = await res.json();
  const menu = new Menu(data);

  function callback(mealTime, mealType, element, i) {
    const returnEmptyIfNull = (element = null, { prefix = "" } = {}) =>
      element == null ? "" : prefix + element;

    document
      .querySelector(`#${mealTime}-${mealType}-${i + 1}-title`)
      .setAttribute("value", returnEmptyIfNull(element.title));

    document.querySelector(
      `#${mealTime}-${mealType}-${i + 1}-description`
    ).value = returnEmptyIfNull(element.description);

    if (element.image != null)
      document.querySelector(`#${mealTime}-${mealType}-${i + 1}-image`).src =
        returnEmptyIfNull(element.image, { prefix: GLOBAL_PREFIX });

    // console.log(element);
  }

  menu.loop("pranzo", "primo", (el, i) => callback("pranzo", "primo", el, i));
  menu.loop("pranzo", "secondo", (el, i) =>
    callback("pranzo", "secondo", el, i)
  );
  menu.loop("cena", "primo", (el, i) => callback("cena", "primo", el, i));
  menu.loop("cena", "secondo", (el, i) => callback("cena", "secondo", el, i));
}

getAndWriteSavedData();

highlighNonEmptyInputs();

document.querySelector("#save").addEventListener("click", saveData);
document.querySelector("#clear").addEventListener("click", clearData);
