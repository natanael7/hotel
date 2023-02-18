const delay = (t, val) => new Promise((resolve) => setTimeout(resolve, t, val));
const removeElement = (el) => el.remove();

const elementsToRemove = [];

const removeNotNeededFunctionality = () => {
  elementsToRemove.map(removeElement);
};
const makeEditable = (element) => (element.contentEditable = true);

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
    img.style.border = "5px solid green";
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

async function updateMenuServer() {
  console.log("Upda");
  location.reload();
}

async function ready() {
  await delay(500);
  populateArrays();
  removeNotNeededFunctionality();
  addUpdateButton();
  addEditFunctionality();
  addChangeImageFunctionality();
}
ready();
