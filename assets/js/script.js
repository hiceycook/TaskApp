var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do")

// ADD TASK BUTTON CLICK FUNCTION
var createTaskHandler = function (event) {
    event.preventDefault();
    // COLLECT FORM VALUES //
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name = 'task-type']").value;

    // CREATE A NEW LI //
    var listItemEl = document.createElement("li");

    // GIVE CLASS NAME TO STYLE LIST ITEM //
    listItemEl.className = "task-item";

    // CREATE A DIV TO HOLD TASK INFO AND ADD TO LI //
    var taskInfoEl = document.createElement("div");

    // GIVE ITEM A CLASS NAME //
    taskInfoEl.className = "task-info";

    // ADD HTML CONTENT TO DIV //
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    // ADD NEW DIV TO LI //
    listItemEl.appendChild(taskInfoEl);

    // ADD THE NEW LI ELEMENT TO THE UL //
    tasksToDoEl.appendChild(listItemEl);

};
// ADD THE BUTTON EVENT
formEl.addEventListener("submit", createTaskHandler);





