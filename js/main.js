const inputsElement = document.querySelector("#input-list");

inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    // do stuff
  }
});

const inputsArr = [];
let inputsStr = inputsElement.value;
let completion = "none";

function parseStr(str) {
  str = str.trim();
  strArr = str.split(",").map((substr) => `<li>${substr.trim()}</li>`);
  return strArr;
}
