const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener("submit", addTask);

    taskList.addEventListener("click", removeTask);

    clearBtn.addEventListener("click", clearTasks);

    filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        // create Text Node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link
        const link = document.createElement("a");
        link.className = "delete-item secondary-content btn-remove";
        link.innerText = "X";

        li.appendChild(link);

        taskList.appendChild(li);

    })
}

function addTask(e) {
    if (taskInput.value === "") {
        alert("Add the task!");
    }

    // create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content btn-remove";
    link.innerText = "X";

    li.appendChild(link);

    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// remove textDecorationSkip:
function removeTask(e) {
    if (e.target.parentElement.className === "collection-item") {
        if (confirm("Are you sure?")) {
            let elToRemove = e.target.parentElement;
            elToRemove.remove();

            let textCont = elToRemove.textContent.substring(0, elToRemove.textContent.length - 1);

            removeTaskFromLocaleStorage(textCont);
        }
    }
}

// Remove task from locale storage

function removeTaskFromLocaleStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(taskItem, i) {
        console.log(taskItem);
        if (taskItem === task) {
            tasks.splice(i, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (tasks.length === 0) {
        localStorage.removeItem('tasks');
    }
}

// clear tasks
function clearTasks() {
    if (confirm("Are you sure you want to delete all the tasks")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

// filter tasks

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