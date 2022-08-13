// DOM elements
const inputsElement = document.querySelector("#input-list");
const currentGoals = document.querySelector(".current-goals");
const totalCountSpan = document.querySelector(".total-count");
const completedCountSpan = document.querySelector(".completed-count");
const percentSpan = document.querySelector(".percent");

// root element for event bubbling on dynamically added elements
const rootElement = document.querySelector("section");
rootElement.addEventListener("click", (e) => {
  markComplete(e.target);
});

// vars
let completion = "none";
let completeCount = 0;
let totalCount = 0;
const inputsArr = [];

// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const inputsStr = inputsElement.value;
    const newElements = parseStr(inputsStr);
    inputsArr.concat(newElements);
    newElements.forEach((input) => {
      currentGoals.innerHTML += input;
    });
    inputsElement.value = "";
    totalCount += inputsArr.length;
  }
});

// helper function to parse input strings into DOM elements
function parseStr(str) {
  str = str.trim();
  strArr = str
    .split(",")
    .map((substr) => `<li id="item">${substr.trim()}</li>`);
  return strArr;
}

// helper function to mark items complete or incomplete
function markComplete(element) {
  if (!element.classList.contains("complete")) {
    completeCount++;
  } else {
    completeCount--;
  }
  element.classList.toggle("complete");
  completedCountSpan.innerHTML = completeCount;
}
