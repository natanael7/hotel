const PREFIX = "/src/img/";
const DELAY = 800;

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
  applyIDs(ids = [], prefix = "") {
    if (!Array.isArray(ids)) return;
    if (ids.length == 0) return;
    const applyID = (el) => {
      if (el.image == null) return;
      if (el.image.constructor == File) el.image = prefix + ids.shift();
    };
    this.loopAll(applyID);
  }
}
const blankMenu = () => ({
  pranzo: {
    primo: { options: [] },
    secondo: { options: [] },
  },
  cena: {
    primo: { options: [] },
    secondo: { options: [] },
  },
});
const uploadFilesToServer = async (files) => {
  if (files.length == 0) return [];
  const formData = new FormData();
  files.map((file) => formData.append("images", file));

  const options = {
    method: "POST",
    body: formData,
  };

  const res = await uploadFiles(options);
  return res;
};

const delay = (t, val) => new Promise((resolve) => setTimeout(resolve, t, val));
const removeElement = (el) => el.remove();

const elementsToRemove = [];

const removeNotNeededFunctionality = () => {
  elementsToRemove.map(removeElement);
};
const applyHighlightedStyle = (element) =>
  (element.style.border = "5px solid green");
const makeEditable = (element) => {
  element.contentEditable = true;
  element.addEventListener("input", () => applyHighlightedStyle(element));
};

const populateArrays = () => {
  elementsToRemove.push(document.querySelector(".order-button"));
  elementsToRemove.push(document.querySelector(".room-number-input"));
  elementsToRemove.push(...document.querySelectorAll(".menu__item-quantity"));
  elementsToRemove.push(...document.querySelectorAll("textarea"));
};
const addUpdateButton = () => {
  const btn = document.createElement("button");
  btn.classList.add("order-button");
  btn.textContent = "Update";
  btn.addEventListener("click", updateMenuServer);
  document.querySelector(".order").append(btn);
};
const addEditFunctionality = () => {
  const editables = Array.prototype.slice
    .call(document.querySelectorAll(".menu__item-title"))
    .concat(
      Array.prototype.slice.call(
        document.querySelectorAll(".menu__item-description")
      )
    );

  editables.map(makeEditable);
};

const makeInput = (wrapper) => {
  const img = wrapper.querySelector("img");

  const input = document.createElement("input");
  input.style.display = "none";
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.addEventListener("change", () => {
    img.src = window.URL.createObjectURL(input.files[0]);
    applyHighlightedStyle(img);
  });

  wrapper.append(input);

  img.addEventListener("click", () => input.click());
  img.style.cursor = "pointer";
};

function addChangeImageFunctionality() {
  const imageWrappers = Array.prototype.slice.call(
    document.querySelectorAll(".menu__item-wrapper")
  );
  imageWrappers.map(makeInput);
}

const parseMenuItemToObject = (menuItem) => {
  const title = menuItem.querySelector(".menu__item-title").textContent;
  const description = menuItem.querySelector(
    ".menu__item-description"
  ).textContent;
  const imageFromSrc = menuItem
    .querySelector(".menu__item-image")
    .getAttribute("src");

  const imageFromUpload = menuItem.querySelector("input").files[0];

  let image = imageFromUpload;

  if (imageFromUpload == undefined && imageFromSrc != null)
    image = imageFromSrc;
  console.log(image);
  const id = menuItem.id;
  const [time, type, index] = id.split("_");

  return { title, image, description, time, type, index };
};

const pushObjectToMenu = (
  menu,
  { title, image, description, time, type, index }
) => {
  menu[time][type].options[index] = {
    title,
    image,
    description,
  };
};

const getMenuDataFromPage = () => {
  const elements = Array.prototype.slice.call(
    document.querySelectorAll(".menu__item")
  );
  const menu = blankMenu();
  const objects = elements.map(parseMenuItemToObject);
  objects.map((el) => pushObjectToMenu(menu, el));
  return menu;
};

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

  postLocalMenu(options);
}

async function updateMenuServer() {
  const menu = new Menu(getMenuDataFromPage());
  const files = menu.files();

  const fileIDs = await uploadFilesToServer(files);

  menu.applyIDs(fileIDs, PREFIX);
  menu._id = document.querySelector("section.menu").id;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  };

  await editMenu(options);
  location.reload();
}

async function ready() {
  await delay(DELAY);
  populateArrays();
  removeNotNeededFunctionality();
  addUpdateButton();
  addEditFunctionality();
  addChangeImageFunctionality();
}
ready();
