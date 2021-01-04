
import { createCollectionBtn, 
    collectionNameInput,
    collectionDescInput } from './ToDoCollectionManager.js';
import { taskCreateBtn } from './CollectionDisplayer.js';

const popup = document.getElementById('popup');


const collectionForm = document.getElementById('collectionForm');
const collectionFormHeader = document.getElementById('collectionFormHeader');

const taskForm = document.getElementById('taskForm');
const taskFormHeader = document.getElementById('taskFormHeader');


const popupCloseArea = document.getElementById('popupCloseArea');
popupCloseArea.onclick = ClosePopup;

const addCollectionPopupBtn = document.getElementById('toDoCollectionAddPopupBtn');
addCollectionPopupBtn.onclick = OpenAddCollectionPopup;

export var isInEditing = false;

export function OpenAddCollectionPopup(){
    collectionFormHeader.textContent = "Create a new list of to dos";
    createCollectionBtn.textContent = "Create!";
    DisplayPopup(false);
    isInEditing = false;
}

// to CollectionDisplayer
export function OpenAddTaskPopup(){
    taskFormHeader.textContent = "Create a new task!"
    taskCreateBtn.textContent = "Create!";
    DisplayPopup(true);
    isInEditing = false;
}

// to ContextMenuControl
export function OpenEditCollectionPopup(collection){
    collectionFormHeader.textContent = `Edit ${collection.name}`;
    createCollectionBtn.textContent = "Update!";
    collectionNameInput.value = collection.name;
    collectionDescInput.value = collection.description;
    DisplayPopup(false);
    isInEditing = true;
}

// to ContextMenuControl
export function OpenEditTaskPopup(task){
    taskFormHeader.textContent = `Edit ${task.name}`;
    taskCreateBtn.textContent = "Update!";
    DisplayPopup(true);
    isInEditing = true;
}

// to CollectionDisplayer, ContextMenuControl
export function ClosePopup(){
    popup.style.display = "none";
}

function SetFormTexts(){

}

export function DisplayPopup(isTask){
    popup.style.display = "block";
    collectionForm.style.display = isTask ? "none" : "flex";
    taskForm.style.display = isTask? "flex" : "none";
    console.log("opened popup");
}