// Define Ui Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listerners
loadEventListeners();

// add task event
function loadEventListeners() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from Ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // create text node amd append to li
    li.appendChild(document.createTextNode(task));

    // create new link eleement

    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon hml
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // create a li element when we add something
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // create text node amd append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link eleement

  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon hml
  link.innerHTML = '<i class= "fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // store in Ls
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  // to target the 'x' element we call parent element because on clicking x we get icon but actually we want its parent the link. and then we look for all the class name it contains
  if (e.target.parentElement.classList.contains("delete-item")) {
    // now once we get the x element we have to remove the list item which is the parent of the parent of the icon. so
    if (confirm("Are you suar?")) {
      e.target.parentElement.parentElement.remove();

      //  remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from Ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// clear tasks
function clearTasks(e) {
  // two ways
  // taskList.innerHTML='';

  // faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from Ls
  clearTasksFromLocalStorage();
}

// clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
