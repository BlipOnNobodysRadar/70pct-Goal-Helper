const inputsElement = document.querySelector("#input-list");
const currentGoals = document.querySelector(".current-goals");

let completion = "none";
const inputsArr = [];

inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const inputsStr = inputsElement.value;
    const newElements = parseStr(str);
    inputsArr.concat(newElements);
    newElements.forEach((input) => {
      currentGoals.innerHTML += input;
    });
  }
});

function parseStr(str) {
  str = str.trim();
  strArr = str.split(",").map((substr) => `<li>${substr.trim()}</li>`);
  return strArr;
}
