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
    //CHECK IF INPUT IS EDIT //
    var isEdit = formEl.hasAttribute("data-task-id");






    // PACKAGE DATA AS AN OBJECT //
    // var taskDataObj = {
    //     name: taskNameInput,
    //     type: taskTypeInput
    // };

    // IF HAS TASK ID, THEN RU NEDIT FUNCTION, IF NOT, NEW LIST ITEM FUNCTION CALLED //
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function (taskName, taskType, taskId) {
    // FIND THE MATCHING LIST ITEM BY ID //
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // SET NEW VALUES //
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    // REMOVE ID FROM FORM AND CHANGE BUTTON BACK TO SUBMIT //
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
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

// TASK BUTTON DELETE OR EDIT FUNCTION //
var taskButtonHandler = function (event) {
    // GET TARGET ELEMENT FROM EVENT
    var targetEl = event.target;
    // IF DELETE BUTTON CLICKED //
    if (targetEl.matches(".delete-btn")) {
        //    GET THE ELEMENTS TASK ID //
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    // IF EDIT BUTTON CLICKED //
    else if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id")
        editTask(taskId);
    }
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function (taskId) {
    //  GET THE TASK LIST ITEM BY TASK ID//
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //GET CONTENT FROM THE TASK LIST ITEM //
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // CHANGE SUBMIT BUTTON TO  SAVE BUTTON //
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

}

// EVENT LISTENER FOR TASK BUTTONS //
pageContentEl.addEventListener("click", taskButtonHandler);




