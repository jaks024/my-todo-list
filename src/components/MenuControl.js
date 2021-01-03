
const popup = document.getElementById('popup');
const newListForm = document.getElementById('newListForm');

// task form
const newTaskForm = document.getElementById('newTaskForm');



// form generals 
const popupCloseArea = document.getElementById('popupCloseArea');
popupCloseArea.onclick = ClosePopup;

const showAddToDoPopupBtn = document.getElementById('toDoAddPopupBtn');
showAddToDoPopupBtn.onclick = OpenAddListPopup;

export function OpenAddListPopup(){
    popup.style.display = "block";
    newTaskForm.style.display = "none";
    newListForm.style.display = "flex";
}

export function OpenAddTaskPopup(){
    popup.style.display = "block";
    newTaskForm.style.display = "flex";
    newListForm.style.display = "none";
}

export function ClosePopup(){
    popup.style.display = "none";
}