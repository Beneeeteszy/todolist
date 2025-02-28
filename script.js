// DOM Elements
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const clearAllBtn = document.getElementById("clearAllBtn");


// Filter Buttons
const filterAll = document.getElementById("filterAll");
const filterCompleted = document.getElementById("filterCompleted");
const filterPersonal = document.getElementById("filterPersonal");
const filterWork = document.getElementById("filterWork");
const filterShopping = document.getElementById("filterShopping");
const filterOther = document.getElementById("filterOther");


// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);


// Add Task Function
addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    const dueDate = taskDueDate.value;
    if (taskText !== "") {
        addTask(taskText, category, dueDate);
        taskInput.value = "";
        taskDueDate.value = "";
        saveTasks();
    } else {
        alert("Please enter a task!");
    }
});


// Add Task to the List
function addTask(taskText, category, dueDate) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${taskText} (${category}) - Due: ${dueDate || "No due date"}</span>
    <div class="task-actions">
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    </div>
  `;
    taskList.appendChild(li);


    // Mark task as complete
    li.querySelector("span").addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskCount();
        saveTasks();
    });


    // Edit task
    li.querySelector(".editBtn").addEventListener("click", function () {
        const newText = prompt("Edit your task:", taskText);
        if (newText !== null && newText.trim() !== "") {
            li.querySelector("span").innerText = `${newText.trim()} (${category}) - Due: ${dueDate || "No due date"}`;
            saveTasks();
        }
    });


    // Delete task
    li.querySelector(".deleteBtn").addEventListener("click", function () {
        li.remove();
        updateTaskCount();
        saveTasks();
    });


    updateTaskCount();
}


// Save Tasks to Local Storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load Tasks from Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;
        taskList.appendChild(li);


        if (task.completed) {
            li.classList.add("completed");
        }


        // Add event listeners for loaded tasks
        li.querySelector("span").addEventListener("click", function () {
            li.classList.toggle("completed");
            updateTaskCount();
            saveTasks();
        });


        li.querySelector(".editBtn").addEventListener("click", function () {
            const newText = prompt("Edit your task:", task.text.split(" (")[0]);
            if (newText !== null && newText.trim() !== "") {
                li.querySelector("span").innerText = newText.trim();
                saveTasks();
            }
        });


        li.querySelector(".deleteBtn").addEventListener("click", function () {
            li.remove();
            updateTaskCount();
            saveTasks();
        });
    });
    updateTaskCount();
}


// Update Task Count
function updateTaskCount() {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll(".completed").length;
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
}


// Clear All Tasks
clearAllBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to clear all tasks?")) {
        taskList.innerHTML = "";
        updateTaskCount();
        saveTasks();
    }
});


// Filter Tasks
filterAll.addEventListener("click", () => filterTasks("all"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));
filterPersonal.addEventListener("click", () => filterTasks("Personal"));
filterWork.addEventListener("click", () => filterTasks("Work"));
filterShopping.addEventListener("click", () => filterTasks("Shopping"));
filterOther.addEventListener("click", () => filterTasks("Other"));


function filterTasks(filter) {
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach((task) => {
        const category = task.querySelector("span").innerText;
        if (
            filter === "all" ||
            (filter === "completed" && task.classList.contains("completed")) ||
            category.includes(`(${filter})`)
        ) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}
