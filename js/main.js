// 1:22 break

// DOM elements
const inputsElement = document.querySelector("#input-list");
const currentGoals = document.querySelector(".current-goals");
const totalCountSpan = document.querySelector(".total-count");
const completedCountSpan = document.querySelector(".completed-count");
const percentSpan = document.querySelector(".percent");

// root element for event bubbling on dynamically added elements
const rootElement = document.querySelector("section");
rootElement.addEventListener("click", (e) => {
  if (e.target.id === "item") {
    markComplete(e.target);
  }
});

// vars
let completion = "none";
let completeCount = 0;
let totalCount = 0;
const inputsArr = [];

// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    // take input string, parse it into HTML-formatted list elements (stored as string elements in an array)
    const inputsStr = inputsElement.value;
    const newElements = parseStr(inputsStr);
    // add the new inputs to the array storing all the goals, and update the DOM.
    inputsArr.concat(newElements);
    newElements.forEach((input) => {
      currentGoals.innerHTML += input;
    });
    inputsElement.value = "";
    // take account of the totals, update the DOM
    totalCount += inputsArr.length;
    totalCountSpan.innerHTML = totalCount;
    percentSpan.innerHTML = ((completeCount / totalCount) * 100).toFixed(2);
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
