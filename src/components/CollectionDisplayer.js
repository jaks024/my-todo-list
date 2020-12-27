//import { ToDoCollection } from './ToDoCollection.js';

import { OpenAddTaskPopup } from './MenuControl.js'

const collectionNameField = document.getElementById("d-collectionName");
const collectionDescField = document.getElementById("d-collectionDesc");


//initialize all html elements
initDisplayer();

function initDisplayer(){
    console.log("player initiated");
    GenerateTimeBlocks();
}


var currentCollection = null;

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


function GenerateTimeBlocks(timeType){
    
    var timeBlockIds = [];
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
        timeBlockIds.push(blockId);
    }
}


var resizingElement = null;
var mouseDownPosition = 0;
var moveIntervId;
var originalHeight = 0;
var cursorUp = true;
function mousePos(e){
    var x = e.clientX;
    var y = e.clientY;
    console.log(`name: ${e.target.classList}`);
    ResizeTimeBlockMove(y);

    if(!e.target.classList.contains("timeResizeHandle") && cursorUp){
       ResizeTimeBlockEnd();
    }
}

document.addEventListener("mousemove", mousePos);
document.addEventListener("mouseup", ResizeTimeBlockEnd)

function ResizeTimeBlockStart(e, id){
    resizingElement = document.getElementById(id);
    originalHeight = resizingElement.offsetHeight;
    mouseDownPosition = e.clientY;
    cursorUp = false;
    console.log("set");
   // moveIntervId = setInterval(ResizeTimeBlockMove, 10);
}

function ResizeTimeBlockMove(y){
    if(!resizingElement){
        console.log('not changing');
        return;
    }
    console.log('changing ' + resizingElement.id);
    resizingElement.style.height = (y - mouseDownPosition) + originalHeight + "px"; 
    console.log(`init: ${mouseDownPosition}, curr: ${y}, diff: ${y - mouseDownPosition} relt: ${y - mouseDownPosition + originalHeight}`);
}

function ResizeTimeBlockEnd(){
    if(!resizingElement){
        return;
    }

    clearInterval(moveIntervId);
    cursorUp = true;
    resizingElement = null;
    console.log("cleared");
}

function MakeTaskBlock(){

}