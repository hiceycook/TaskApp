var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do")

// THIS FUNCTION GETS THE FORM INPUTS AND SENDS THEM AS AN ARGUMENT TO createTaskEl FUNCTION
var taskFormHandler = function (event) {
    event.preventDefault();
    // COLLECT FORM VALUES //
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name = 'task-type']").value;
    // PACKAGE DATA AS AN OBJECT //
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    // SEND THE DATA AS AN ARGUMENT AND CALL createTaskEl FUNCTION //
    createTaskEl(taskDataObj);
};

// NEW FUNCTION//
var createTaskEl = function (taskDataObj) {
    // CREATE A NEW LI //
    var listItemEl = document.createElement("li");

    // GIVE CLASS NAME TO STYLE LIST ITEM //
    listItemEl.className = "task-item";

    // CREATE A DIV TO HOLD TASK INFO AND ADD TO LI //
    var taskInfoEl = document.createElement("div");

    // GIVE ITEM A CLASS NAME //
    taskInfoEl.className = "task-info";

    // ADD HTML CONTENT TO DIV //
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // ADD NEW DIV TO LI //
    listItemEl.appendChild(taskInfoEl);

    // ADD THE NEW LI ELEMENT TO THE UL //
    tasksToDoEl.appendChild(listItemEl);

}

// ADD THE BUTTON EVENT
formEl.addEventListener("submit", taskFormHandler);





