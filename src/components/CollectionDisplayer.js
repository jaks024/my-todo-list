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
    const mainDiv = document.getElementById("timeContainer");
    for(var i = 0; i < 24; i++){
        let timeBlock = document.createElement("div");
        timeBlock.classList.add("timeBlock");
        
        let timeLabelWrapper = document.createElement("div");
        timeLabelWrapper.classList.add("timeLabelWrapper");

        let timeLabel = document.createElement("div");
        timeLabel.classList.add("timeLabel");
        timeLabel.innerText = `${`${(i+1) <= 12 ? (i+1) : (i + 1) - 12}:00 ${(i+1) < 12 ? "AM" : "PM"}`}`;
        timeLabelWrapper.appendChild(timeLabel);


        timeBlock.appendChild(timeLabelWrapper);
        timeBlock.onclick = OpenAddTaskPopup;

        mainDiv.appendChild(timeBlock);
    }
}


function MakeTaskBlock(){

}