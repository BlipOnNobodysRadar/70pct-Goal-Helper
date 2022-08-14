// DOM elements
const inputsElement = document.querySelector("#input-list");
const currentGoals = document.querySelector(".current-goals");
const totalCountSpan = document.querySelector(".total-count");
const completedCountSpan = document.querySelector("#completed-count");
const percentSpan = document.querySelector(".percent");

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
updateTasksAndRender(tasksArr);

// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    const newElementsArray = inputStringToElements(inputsElement.value);
    updateTasksAndRender(newElementsArray);
  }
});

/* -----HELPER FUNCTIONS----- */

// function to abstract update and render process
function updateTasksAndRender(newElementsArray) {
  console.log(newElementsArray);

  // add new tasks and update html
  tasksArr = tasksArr.concat(newElementsArray);
  newElementsArray.forEach((input) => {
    currentGoals.innerHTML += input;
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
// checks localstorage for state and updates vars to match localstorage if so
function getLocalStorageVals() {
  console.log("Me running.");
  if (localStorage.getItem("state")) {
    console.log("Me find state in local storage.");
    state = JSON.parse(localStorage.getItem("state"));
    percent = state.percent;
    tasksArr = state.tasksArr;
    completeCount = state.completeCount;
  }
}
// name pretty much summarizes it
function updateState() {
  state.percent = percent;
  state.tasksArr = tasksArr;
  state.completeCount = completeCount;
  localStorage.setItem("state", JSON.stringify(state));
}
