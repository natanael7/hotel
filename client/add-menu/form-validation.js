const REQUIRED = { image: true, title: true, description: true };

const isEmptySrcOrInput = (container) => {
  const imageSrc = container.querySelector("img").getAttribute("src") != null;
  const inputFile =
    container.querySelector(".meal-image-input").files.length > 0;
  console.log(container);
  return imageSrc || inputFile;
};

const validate = () => {
  const containers = Array.prototype.slice.call(
    document.querySelectorAll(".image-input-container")
  );
  const empty = containers.map(isEmptySrcOrInput);
  let res = true;
  empty.map((el) => (res *= el));
  return res;
};
