//import { ToDoCollection } from './ToDoCollection.js';
import { ToDoTask } from './ToDoObjects.js';
import { OpenAddTaskPopup, ClosePopup } from './MenuControl.js';
import { GenerateRandomIdNoDup } from './Utilities.js';
import { getFormattedTime } from './TaskControl.js';
import  { setCurrentTask } from './TaskControl.js';
import { SaveAllCollection } from './ToDoCollectionManager.js';


const collectionNameField = document.getElementById("d-collectionName");
const collectionDescField = document.getElementById("d-collectionDesc");


// task popups
const taskNameField = document.getElementById('taskNameInputBox');
const taskStartDateField = document.getElementById('taskStartDateInputBox');
const taskEndDateField = document.getElementById('taskEndDateInputBox');
const taskStartTimeField = document.getElementById('taskStartTimeInputBox');
const taskEndTimeField = document.getElementById('taskEndTimeInputBox');
const taskDescField = document.getElementById('taskDescriptionInputBox');
const taskCreateBtn = document.getElementById('createTaskBtn');
taskCreateBtn.addEventListener("click", function(){
    if(canCreateNewTask()){
        CreateNewTask();
        SaveAllCollection();
        ClosePopup();
    }
});



const taskContainer = document.getElementById('taskContainer');

var currentCollection = null;
var taskIds = [];

const taskIdMin = 10000;
const taskIdMax = 10000000;

// same size as css, in percent
const taskBlockMinWidth = 50; 

// resizing time blcoks variables
var resizingElement = null;
var mouseDownPosition = 0;
var originalHeight = 0;
var cursorUp = true;

// resizing delay for lower cpu usage
var prevTime;

// time block heights
var timeBlockProperties;
var timeBlockIdToIntKeyMap;

// event for updating task time labels
//export const onTimeBlockChange = new Event('onTimeBlockChange', {bubbles: true});

// export to initializer
export function InitDisplayer(){
    GenerateTimeBlocks();
}

// for toDoCollectionManager collection loading
export function AddTaskIdToList(id){
    taskIds.push(id);
    console.log("task ids: " + taskIds);
}


// time blocks

export function DisplayCollection(collection){

    if(currentCollection != null &&
         collection.id === currentCollection.id){
        console.log(`already displaying ${collection.id}`);
        return;
    }
    taskContainer.innerHTML = "";
    currentCollection = collection;
    collectionNameField.innerText = currentCollection.name;
    collectionDescField.innerText = currentCollection.description;

    currentCollection.tasks.forEach(element => {
        CreateTaskElement(element);
    });

    console.log(`displaying ${collection.id}`);
}

export function getTimeBlockBasedOnPos(y){
    let total = 0;
    for(const [id, height] of timeBlockProperties.entries()){
        if(y >= total  && y <= total + height){
            return [id, height];
        }
        total += height;
    }
    return null;
}

// from and to are integers 
export function getTimeBlockRegionHeight(from, to){
    let total = 0;
    for(const [id, height] of timeBlockProperties.entries()){
        if(id >= from && id <= to){
            total += height;
        }
    }
    return total;
}

function getTimeBlockBasedOnTime(time){
    for(const [id, height] of timeBlockProperties.entries()){
        if(time === id){
            return [id, height];
        }
    }
    return null;
}


function GenerateTimeBlocks(timeType){
    timeBlockProperties = new Map();
    timeBlockIdToIntKeyMap = new Map();
    const mainDiv = document.getElementById("timeContainer");
    for(var i = 0; i < 24; i++){
        let blockId = `${i}-timeBlock`;

        let timeBlock = document.createElement("div");
        timeBlock.classList.add("timeBlock");
        
        let timeLabelWrapper = document.createElement("div");
        timeLabelWrapper.classList.add("timeLabelWrapper");

        let timeLabel = document.createElement("div");
        timeLabel.classList.add("timeLabel");
        timeLabel.innerText = `${`${(i+1) <= 12 ? (i+1) : (i + 1) - 12}:00 ${(i+1) < 12 ? "AM" : "PM"}`}`;
        timeLabelWrapper.appendChild(timeLabel);

        let startTime = i + 1;
        timeLabelWrapper.addEventListener("click", function(e){
            SetAndOpenAddTaskPopup(startTime);
            console.log(startTime);
        });

        let timeResizeHandle = document.createElement("div");
        timeResizeHandle.classList.add("timeResizeHandle");
        timeResizeHandle.addEventListener("mousedown", function(e){
            ResizeTimeBlockStart(e, blockId);
        });
        //timeResizeHandle.addEventListener("mousemove", ResizeTimeBlockMove);
        timeResizeHandle.addEventListener("mouseup", ResizeTimeBlockEnd);
        
        timeBlock.appendChild(timeLabelWrapper);
        timeBlock.appendChild(timeResizeHandle);

        mainDiv.appendChild(timeBlock);
        
        timeBlock.id = blockId;
        timeBlockProperties.set(i, 50);
        timeBlockIdToIntKeyMap.set(blockId, i);
    }
}


// tasks

function canCreateNewTask(){
    return taskNameField.value.length > 0 && currentCollection
}

function CreateNewTask(){
    let newTask = new ToDoTask;
    let id = GenerateRandomIdNoDup(taskIds, taskIdMin, taskIdMax);
    newTask.id = id;
    newTask.name = taskNameField.value;
    newTask.description = taskDescField.value;
    newTask.color = "0:0:0";
    newTask.startTime = stringTimeToSeconds(taskStartTimeField.value);
    newTask.endTime = stringTimeToSeconds(taskEndTimeField.value);
    newTask.startDate = taskStartDateField.value;
    newTask.endDate = taskEndDateField.value;
    newTask.zIndex = 0;
    newTask.width = taskBlockMinWidth;

    currentCollection.tasks.push(newTask);
    //console.log(currentCollection);

    taskIds.push(id);

    //taskContainer.innerHTML = taskContainer.innerHTML.concat(TaskTemplate(newTask));

    CreateTaskElement(newTask)

    console.log("created " + newTask.id);
}

function CreateTaskElement(task){
    let yPos = timeToYPosition(task.startTime);
    console.log("starttime: " + task.startTime + "; ypos: " + yPos);

    var wrapperDiv = document.createElement("div");
    wrapperDiv.id = task.id;
    wrapperDiv.classList.add("taskBlockWrapper");
    wrapperDiv.style.left = task.zIndex + "%";
    wrapperDiv.style.top = yPos + "px";
    wrapperDiv.style.height = timeToYPosition(task.endTime) - yPos + "px";
    wrapperDiv.innerHTML = TaskTemplate(task);
    wrapperDiv.style.zIndex = Math.round(task.zIndex);
    wrapperDiv.style.width = task.width + "%";

    wrapperDiv.addEventListener("mousedown", function(e) {
        setCurrentTask(task.id, task, e);
        console.log("click on " + task.id);
    }, false);
    console.log(wrapperDiv);

    taskContainer.appendChild(wrapperDiv);
}

function TaskTemplate(task){
    let startTime = getFormattedTime(Math.floor(task.startTime / 60), Math.round(((task.startTime / 60) % 1) * 60));
    let endTime = getFormattedTime(Math.floor(task.endTime / 60), Math.round(((task.endTime / 60) % 1) * 60));
    return ` <div class="taskBlock draggable">
                <div class="taskBlockTitleBar">
                    <span class="taskBlockTimeStart">${startTime}</span>
                    <span class="taskBlockTimeEnd">- ${endTime}</span>
                    <span class="taskBlockName taskText">${task.name}</span>
                </div>
                <span class="taskBlockDescription taskText">${task.description}</span>
            </div>
            <div class="taskBlockDragRight"></div>
            <div class="taskBlockDragBot"></div>
            <div class="taskBlockDragBotRight"></div>`;
}

function timeToYPosition(seconds){
    let currentTimeBlock = getTimeBlockBasedOnTime(Math.floor(seconds / 60) - 1);
    let precedingTotalHeight = getTimeBlockRegionHeight(0, currentTimeBlock[0] - 1);
    let minuteToHeight = ((seconds / 60) % 1) * currentTimeBlock[1];
    //console.log(`time ${seconds}; preceding ${precedingTotalHeight}; minutes ${((seconds / 60) % 1)}`);
    return precedingTotalHeight + minuteToHeight;
}

function stringTimeToSeconds(s){
    let times = s.split(':');
    let hour = parseInt(times[0]);
    let minute = parseInt(times[1]);

    return hour * 60 + minute;
}

function SetAndOpenAddTaskPopup(startTime){
    OpenAddTaskPopup();

    let date = new Date();
    
    let dateNow = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    taskStartDateField.value = dateNow;
    taskEndDateField.value = dateNow; 

    taskStartTimeField.value = `${startTime}:00`;
    taskEndTimeField.value = `${startTime}:30`;
}

function RecalculateTaskPositions(){
    if(!currentCollection){
        return;
    }

    currentCollection.tasks.forEach(element => {
        //console.log(element);
        let elem = document.getElementById(element.id);
        let newYPos = timeToYPosition(element.startTime);

        elem.style.top = newYPos + "px";
        elem.style.height = timeToYPosition(element.endTime) - newYPos + "px";
    });
}


// time block resizing


function ResizeMoveDelayer(e){
    var time = new Date().getTime();
    if(time - prevTime < 100){
        return;
    }
    prevTime = time;

    ResizeTimeBlockMove(e.clientY);
    if(!e.target.classList.contains("timeResizeHandle") && cursorUp){
       ResizeTimeBlockEnd();
    }

}

function ResizeTimeBlockStart(e, id){
    resizingElement = document.getElementById(id);
    originalHeight = resizingElement.offsetHeight;
    mouseDownPosition = e.clientY;
    cursorUp = false;
    document.addEventListener("mousemove", ResizeMoveDelayer);
    document.addEventListener("mouseup", ResizeTimeBlockEnd)
    document.body.style.cursor = "s-resize";
}

function ResizeTimeBlockMove(y){
    if(!resizingElement){
        return;
    }
    resizingElement.style.height = Math.ceil(((y - mouseDownPosition) + originalHeight) / 25) * 25 + "px"; 
}

function ResizeTimeBlockEnd(){
    if(!resizingElement){
        return;
    }

    timeBlockProperties.set(timeBlockIdToIntKeyMap.get(resizingElement.id), resizingElement.offsetHeight);
    //console.log(timeBlockProperties);   
    RecalculateTaskPositions();
    cursorUp = true;
    resizingElement = null;
    document.removeEventListener("mousemove", ResizeMoveDelayer);
    document.removeEventListener("mouseup", ResizeTimeBlockEnd)
    document.body.style.cursor = "auto";
}