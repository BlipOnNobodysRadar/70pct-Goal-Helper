//TODO
/*
 Make each new element as an object. One property of the element's HTML, the other a flag of isComplete.
 Currently on being marked isComplete, toggles class on that element
 els in array just stored as html strings

 way to get all children of parent element? could just do that and store in state

 redo element creation properly. document.createElement
*/

// DOM elements
const inputsElement = document.querySelector("#input-list");
const tasksList = document.querySelector(".current-goals");
const totalCountSpan = document.querySelector(".total-count");
const completedCountSpan = document.querySelector("#completed-count");
const percentSpan = document.querySelector(".percent");
const clearButton = document.querySelector("button");

// root element for event capturing on dynamically added elements
const rootElement = document.querySelector("section");
rootElement.addEventListener("click", (e) => {
  if (e.target.id === "item") {
    markComplete(e.target);
  }
});
// reset: just store state as an object, convert to JSON for store in localstorage and back when retrieving

// default vars
let completeCount = 0;
let totalCount = 0;
let tasksArr = [];
let percent = 0;
let state = {
  completeCount: completeCount,
  totalCount: totalCount,
  tasksArr: tasksArr,
  percent: percent,
};

// run on page load
getLocalStorageVals();
updateTasksAndRender(tasksArr, true);

// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const newElementsArray = inputStringToElements(inputsElement.value);
    updateTasksAndRender(newElementsArray);
  }
});

// clear button
clearButton.addEventListener("click", (e) => {
  tasksList.innerHTML = "";
  completeCount = 0;
  totalCount = 0;
  tasksArr = [];
  percent = percent;
  updateState();
  updateTasksAndRender(tasksArr, true);
  localStorage.clear();
});

/* -----HELPER FUNCTIONS----- */
// checks localstorage for state and updates vars to match localstorage if found
function getLocalStorageVals() {
  if (localStorage.getItem("state")) {
    state = JSON.parse(localStorage.getItem("state"));
    percent = state.percent;
    tasksArr = state.tasksArr;
    completeCount = state.completeCount;
  }
}

// function to abstract update and render process
function updateTasksAndRender(newElementsArray, localStorage = false) {
  console.log(newElementsArray);

  // add new tasks and update html
  if (!localStorage) {
    tasksArr = tasksArr.concat(newElementsArray);
  }
  newElementsArray.forEach((input) => {
    tasksList.innerHTML += input;
  });
  // set input element to empty again
  inputsElement.value = "";
  // update total count
  totalCount += newElementsArray.length;
  completedCountSpan.innerHTML = completeCount;
  totalCountSpan.innerHTML = totalCount;
  updatePercent();
  updateColors();
  updateState();
}
// helper function to parse input strings into DOM elements
function inputStringToElements(str) {
  str = str.trim();
  strArr = str
    .split(",")
    .map((substr) => `<li id="item">${substr.trim()}</li>`);
  return strArr;
}
// helper function to mark items complete or incomplete
function markComplete(element) {
  // need to update local storage of item so it renders as marked or unmarked correctly
  // need a flag on each element in local storage as to whether it is marked complete or not
  // need to change presentation based on that completeness
  if (!element.classList.contains("complete")) {
    completeCount++;
  } else {
    completeCount--;
  }
  element.classList.toggle("complete");
  completedCountSpan.innerHTML = completeCount;
  updatePercent();
  updateColors();
  // updateState(); need completion stored in state
}

// updates percentages
function updatePercent() {
  percent = totalCount > 0 ? (completeCount / totalCount) * 100 : 0;
  percentSpan.innerHTML = percent.toFixed(2) + "%";
}
// updates colors depending on percentages
function updateColors() {
  switch (true) {
    case percent >= 80:
      percentSpan.className = "eighty";
      completedCountSpan.className = "eighty";
      break;
    case percent >= 70:
      percentSpan.className = "seventy";
      completedCountSpan.className = "seventy";
      break;
    case percent >= 50:
      percentSpan.className = "half";
      completedCountSpan.className = "half";
      break;
    case percent >= 33:
      percentSpan.className = "third";
      completedCountSpan.className = "third";
      break;
    case percent > 0:
      percentSpan.className = "began";
      completedCountSpan.className = "began";
      break;
    default:
      percentSpan.className = "none";
      completedCountSpan.className = "none";
      break;
  }
}
// name pretty much summarizes it
function updateState() {
  state.percent = percent;
  state.tasksArr = tasksArr;
  state.completeCount = completeCount;
  localStorage.setItem("state", JSON.stringify(state));
}
