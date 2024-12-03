const form = document.querySelector("form");
const input = document.querySelector("input");
const section = document.querySelector("section");
const ul = document.querySelector("ul");
function removeButton(listWichWillBeRemoved) {
    const button = document.createElement("button");
    button.addEventListener("click", (ev) => {
        ev.preventDefault();
        ul.removeChild(listWichWillBeRemoved);
        updateLocalStorage();
    });
    button.classList.add("removeAndEditClass");
    button.innerText = "REMOVE";
    return button;
}
function editButton(listWichWillBeEdited) {
    const button = document.createElement("button");
    button.addEventListener("click", (ev) => {
        if (input.value !== "") {
            alert("The word space needs to be empty!");
            return;
        }
        ev.preventDefault();
        input.value = listWichWillBeEdited.querySelector("span").innerText;
        ul.removeChild(listWichWillBeEdited);
        updateLocalStorage();
    });
    button.classList.add("removeAndEditClass");
    button.innerText = "EDIT";
    return button;
}
function createTask(text) {
    const li = document.createElement("li");
    const btnContainer = document.createElement("article");
    btnContainer.classList.add("button-container");
    const removeBtn = removeButton(li);
    const editBtn = editButton(li);
    removeBtn.classList.add("button-container");
    editBtn.classList.add("button-container");
    const taskText = document.createElement("span");
    taskText.innerText = text;
    btnContainer.append(removeBtn, editBtn);
    li.append(taskText, btnContainer);
    ul.appendChild(li);
    input.value = "";
}
function updateLocalStorage() {
    const tasks = [];
    const listItems = ul.querySelectorAll("li");
    listItems.forEach((list) => {
        tasks.push(list.querySelector("span").innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => { createTask(task); });
}
loadTasks();
form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (input.value == "") {
        alert("You need to add a task!");
        return;
    }
    createTask(input.value);
    updateLocalStorage();
    input.value = "";
});


