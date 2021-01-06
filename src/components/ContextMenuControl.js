import { OpenEditCollectionPopup, OpenEditTaskPopup } from './MenuControl.js';
import { getCollection, setCollection, SaveAllCollection } from './ToDoCollectionManager.js';

const contextMenu = document.getElementById("contextMenu")
const contextMenuEditBtn = document.getElementById("contextMenuEditBtn");
contextMenuEditBtn.addEventListener('click', OpenEditMenu, false);

const contextMenuDeleteBtn = document.getElementById("contextMenuDeleteBtn");
contextMenuDeleteBtn.addEventListener('click', DeleteCurrentlySelected, false);

const contextCloseArea = document.getElementById("contextCloseArea");
contextCloseArea.addEventListener('click', CloseContextMenu, false);

export var currentTask = null;

// to toDoCollectionManager for button onclick editing updates
export var currentContextCollection = null;
var inTaskContextMenu = false;

const menuEdgePadding = 10;

export function OpenContextMenuCollection(x, y, collection){
    EnableContextMenu(x, y);
    currentTask = null;
    currentContextCollection = collection;
    inTaskContextMenu = false;
}

export function OpenContextMenuTask(x, y, task, collection){
    EnableContextMenu(x, y);
    currentTask = task;
    currentContextCollection = collection;
    inTaskContextMenu = true;
    console.log(`current task id ${task.id} and coll id ${collection.id}`);
}

export function CloseContextMenu(){
    contextCloseArea.style.display = "none";
    contextMenu.style.display = "none";
}

function EnableContextMenu(x, y){
    contextCloseArea.style.display = "block";
    contextMenu.style.display = "block";
    CalculateContextMenuPosition(x, y);
}


function OpenEditMenu(){
    if(currentTask){
        OpenEditTaskPopup(currentTask);
    } else {
        OpenEditCollectionPopup(currentContextCollection);
    }
    CloseContextMenu();
}

function DeleteCurrentlySelected(){
    if(!currentContextCollection){
        return;
    }

    if(inTaskContextMenu && currentTask){
       currentContextCollection.tasks = currentContextCollection.tasks.filter(function(task) {
           return task.id !== currentTask.id; 
       });
        console.log(`deleted ${currentTask} from ${currentContextCollection.id}`);
        document.getElementById(currentTask.id).outerHTML = "";
    } else {
         setCollection(getCollection().filter(function(coll){
             return coll.id !== currentContextCollection.id; 
         }));
         console.log("deleted " + currentContextCollection.id);
         document.getElementById(currentContextCollection.id).outerHTML = "";
    }        
    currentTask = null;
    currentContextCollection = null;
    SaveAllCollection();
    CloseContextMenu();
}

function CalculateContextMenuPosition(x, y){
    let bodyHeight = document.body.offsetHeight;
    let bodyWidth = document.body.offsetWidth;
    if(y + contextMenu.offsetHeight >= bodyHeight){
        contextMenu.style.top = bodyHeight - contextMenu.offsetHeight - menuEdgePadding + "px";
    } else {
        contextMenu.style.top = y + "px";
    }

    if(x + contextMenu.offsetWidth >= bodyWidth){
        contextMenu.style.left = bodyWidth - contextMenu.offsetWidth - menuEdgePadding + "px";
    } else {
        contextMenu.style.left = x + "px";
    }
}