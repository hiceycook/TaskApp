var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do")
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// THIS FUNCTION GETS THE FORM INPUTS AND SENDS THEM AS AN ARGUMENT TO createTaskEl FUNCTION
var taskFormHandler = function (event) {
    event.preventDefault();
    // COLLECT FORM VALUES //
    var taskNameInput = document.querySelector("input[name = 'task-name']").value;
    var taskTypeInput = document.querySelector("select[name = 'task-type']").value;
    // VALIDATE INPUT BY CHECKING FOR EMPTY STRINGS//
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form.");
        return false;
    }
    // RESET THE FORM AFTER SUBMISSION//
    formEl.reset();
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

    // ADD TASK ID AS A CUSTOM ATTRIBUTE//
    listItemEl.setAttribute("data-task-id", taskIdCounter)

    // CREATE A DIV TO HOLD TASK INFO AND ADD TO LI //
    var taskInfoEl = document.createElement("div");

    // GIVE ITEM A CLASS NAME //
    taskInfoEl.className = "task-info";

    // ADD HTML CONTENT TO DIV //
    taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // ADD NEW DIV TO LI //
    listItemEl.appendChild(taskInfoEl);
    // ADD BUTTONS TO LIST ITEM //
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // ADD THE NEW LI ELEMENT TO THE UL //
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    // CREATE DIV WITH CLASS = "TASK-ACTIONS" //
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // CREATE EDIT BUTTON AND APPEND TO DIV //
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //CREATE DELETE BUTTON AND APPEND TO DIV //
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //  CREATE DROPDOWN SELECT AND APPEND TO DIV //
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //CREATE OPTIONS FOR THE SELECT ELEMENT //
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element //
        var statusOptionEL = document.createElement("option");
        statusOptionEL.textContent = statusChoices[i];
        statusOptionEL.setAttribute = ("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEL);
    }
    return actionContainerEl;
};

// SUBMIT BUTTON EVENT //
formEl.addEventListener("submit", taskFormHandler);

// TASK BUTTON FUNCTION //
var taskButtonHandler = function (event) {
    if (event.target.matches(".delete-btn")) {
        //    GET THE ELEMENTS TASK ID //
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
};

// EVENT LISTENER FOR TASK BUTTONS //
pageContentEl.addEventListener("click", taskButtonHandler);




