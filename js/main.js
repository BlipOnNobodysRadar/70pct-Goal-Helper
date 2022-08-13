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
let inputsArr = [];
let percent = 0;

// here for future use of localstorage
updateColors();

// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    // take input string, parse it into HTML-formatted list elements (stored as string elements in an array)
    const inputsStr = inputsElement.value;
    const newElements = parseStr(inputsStr);
    // add the new inputs to the array storing all the goals, and update the DOM.
    inputsArr = inputsArr.concat(newElements);
    newElements.forEach((input) => {
      currentGoals.innerHTML += input;
    });
    inputsElement.value = "";
    // take account of the totals, update the DOM
    totalCount += newElements.length;
    totalCountSpan.innerHTML = totalCount;
    updatePercent();
    updateColors();
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
  updatePercent();
  updateColors();
}

// updates percentages
function updatePercent() {
  percent = (completeCount / totalCount) * 100;
  percentSpan.innerHTML = percent.toFixed(2) + "%";
}

// updates colors depending on percentages
function updateColors() {
  console.log(percent);
  console.log(percent > 0);
  switch (true) {
    case percent >= 80:
      percentSpan.className = "eighty";
      break;
    case percent >= 70:
      percentSpan.className = "seventy";
      break;
    case percent >= 50:
      percentSpan.className = "half";
      break;
    case percent >= 33:
      percentSpan.className = "third";
      break;
    case percent > 0:
      percentSpan.className = "began";
      break;
    default:
      percentSpan.className = "none";
      break;
  }
}
