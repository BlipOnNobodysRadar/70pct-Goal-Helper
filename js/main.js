/*------Controller------*/
//                            //
//                           //
class State {
  constructor() {
    this.completeCount = 0;
    this.totalCount = 0;
    this.tasks = [];
    this.percent = 0;
  }
}
// default state
let state = new State();
/* -----HELPER FUNCTIONS----- */
//                            //
//                           //

//class to represent tasks and track completion
class Task {
  constructor(taskName, id) {
    this.taskName = taskName;
    this.complete = false;
    this.id = id;
  }
}
// receives DOM element representing a task, and updates the task obj's state to reflect the change
function updateController(element) {
  let taskIndex = state.tasks.findIndex(
    (task) => task.id.toString() === element.id
  );
  if (!element.classList.contains("complete")) {
    state.tasks[taskIndex].complete = true;
    state.completeCount = state.completeCount + 1;
  } else {
    state.tasks[taskIndex].complete = false;
    state.completeCount = state.completeCount - 1;
  }
  state.percent =
    state.totalCount > 0 ? (state.completeCount / state.totalCount) * 100 : 0;
  storeState();
}

// Converts input string into array of Task objects and updates count.
function handleInput(inputString) {
  inputString = inputString.trim();
  const tasks = inputString.split(",").map((input) => {
    let id = state.totalCount;
    state.totalCount = state.totalCount + 1;
    let task = new Task(input.trim(), id);
    return task;
  });
  state.tasks = state.tasks.concat(tasks);
  storeState();
  return tasks;
}
// checks localstorage for state and updates vars to match localstorage if found
function getLocalStorageVals() {
  if (localStorage.getItem("state")) {
    state = JSON.parse(localStorage.getItem("state"));
  }
}
// updates state and storage of state
function storeState() {
  localStorage.setItem("state", JSON.stringify(state));
}

/*------UI------*/
//                 //
//                 //
// DOM elements
const inputsElement = document.querySelector("#input-list");
const tasksList = document.querySelector(".current-goals");
const totalCountSpan = document.querySelector(".total-count");
const completedCountSpan = document.querySelector("#completed-count");
const percentSpan = document.querySelector(".percent");
const clearButton = document.querySelector("button");

// root element for event capturing on dynamically added elements
const rootElement = document.querySelector("section");

/*------UX------*/
//                 //
//                 //

/*------Event Handlers------*/
//                 //
// input handler
inputsElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    handleInput(inputsElement.value);
    renderUI();
    inputsElement.value = "";
  }
});
// item handler
rootElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    markComplete(e.target);
  }
});
// clear button handler
clearButton.addEventListener("click", (e) => {
  clearVisibleTasks();
  localStorage.clear();
  state = new State();
  renderUI();
});

/* -----HELPER FUNCTIONS----- */
//                            //
function markComplete(element) {
  updateController(element);
  renderUI();
}
function clearVisibleTasks() {
  tasksList.innerHTML = "";
}
function renderUI() {
  updateColors(state.percent);
  percentSpan.textContent = state.percent.toFixed(2) + "%";
  completedCountSpan.textContent = state.completeCount;
  totalCountSpan.textContent = state.totalCount;
  clearVisibleTasks();
  state.tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.id = task.id;
    taskElement.textContent = task.taskName;
    taskElement.className = "item";
    if (task.complete) taskElement.classList.toggle("complete");
    tasksList.append(taskElement);
  });
}
// updates colors depending on percentages
function updateColors(percent) {
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

/*------Run on Start------*/
getLocalStorageVals();
renderUI();
