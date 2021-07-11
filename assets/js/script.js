var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do")

// ADD TASK BUTTON CLICK FUNCTION
var createTaskHandler = function (event) {
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}
// ADD TASK BUTTON EVENT
formEl.addEventListener("submit", createTaskHandler);





