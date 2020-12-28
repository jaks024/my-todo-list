//import { ToDoCollection } from './ToDoCollection.js';

import { OpenAddTaskPopup } from './MenuControl.js'

const collectionNameField = document.getElementById("d-collectionName");
const collectionDescField = document.getElementById("d-collectionDesc");


var currentCollection = null;

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

//initialize all html elements
initDisplayer();

function initDisplayer(){
    console.log("player initiated");
    GenerateTimeBlocks();
    //console.log(" back " + getTimeBlockBasedOnPos(65));
    //console.log("get " + getTimeBlockBasedOnPos(30));
}


export function DisplayCollection(collection){

    if(currentCollection != null &&
         collection.id === currentCollection.id){
        console.log(`already displaying ${collection.id}`);
        return;
    }
    currentCollection = collection;
    collectionNameField.innerText = currentCollection.name;
    collectionDescField.innerText = currentCollection.description;
    console.log(`displaying ${collection.name}`);
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
        timeLabelWrapper.onclick = OpenAddTaskPopup;

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
    console.log(timeBlockProperties);   
    cursorUp = true;
    resizingElement = null;
    document.removeEventListener("mousemove", ResizeMoveDelayer);
    document.removeEventListener("mouseup", ResizeTimeBlockEnd)
    document.body.style.cursor = "auto";
}

function MakeTaskBlock(){

}