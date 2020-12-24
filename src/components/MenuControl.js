
const popup = document.getElementById('popup');
const newListForm = document.getElementById('newListForm');
const newTaskForm = document.getElementById('newTaskForm');

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

function ClosePopup(){
    popup.style.display = "none";
}