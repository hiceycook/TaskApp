var buttonEl = document.querySelector("#save-task-button");
var tasksToDoEl = document.querySelector("#tasks-to-do")

// ADD TASK BUTTON CLICK FUNCTION
var createTaskHandler = function () {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}
// ADD TASK BUTTON EVENT
buttonEl.addEventListener("click", createTaskHandler);





