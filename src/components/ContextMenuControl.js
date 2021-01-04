import { OpenEditCollectionPopup, OpenEditTaskPopup } from './MenuControl.js';

const contextMenu = document.getElementById("contextMenu")
const contextMenuEditBtn = document.getElementById("contextMenuEditBtn");
contextMenuEditBtn.addEventListener('click', OpenEditMenu, false);

const contextMenuDeleteBtn = document.getElementById("contextMenuDeleteBtn");
contextMenuDeleteBtn.addEventListener('click', DeleteCurrentlySelected, false);

const contextCloseArea = document.getElementById("contextCloseArea");
contextCloseArea.addEventListener('click', CloseContextMenu, false);

export var currentTask = null;

// to toDoCollectionManager for button onclick editing updates
export var currentCollection = null;

const menuEdgePadding = 10;

export function OpenContextMenu(x, y, isTask, item){
    contextCloseArea.style.display = "block";
    contextMenu.style.display = "block";
    CalculateContextMenuPosition(x, y);
    if(isTask){
        currentTask = item;
        currentCollection = null
    } else {
        currentCollection = item;
        currentTask = null;
    }
}

export function CloseContextMenu(){
    contextCloseArea.style.display = "none";
    contextMenu.style.display = "none";
}



function OpenEditMenu(){
    if(currentTask){
        OpenEditTaskPopup(currentTask);
    } else {
        OpenEditCollectionPopup(currentCollection);
    }
    CloseContextMenu();
}

function DeleteCurrentlySelected(){
    console.log("delete");
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