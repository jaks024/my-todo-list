import { getTimeBlockBasedOnPos, 
            getTimeBlockRegionHeight } from "./CollectionDisplayer.js";


const t1 = document.getElementById("t1");
const taskContainer = document.getElementById("taskContainer");


// drag to change div position
var movementInitClickX;
var movementInitClickY;
var timeLabelStart;
var timeLabelEnd;

var isChangingSize = false;

// drag to change div size
var initialHeight = 0;
var initialWidth = 0;
var initialClickY = 0;
var initialClickX = 0;
var resizeW = false;
var resizeH = false;

//replace t1 with the general one
t1.addEventListener("mousedown", startDrag, false);

function MouseUpMoveEvents(up, move, isAdd){
    if(up){
        if(isAdd){
            document.addEventListener("mouseup", up, false);
        } else {
            document.removeEventListener("mouseup", up, false);
        }
    } 
    if (move) {
        if (isAdd){
            document.addEventListener("mousemove", move, false);
        } else {
            document.removeEventListener("mousemove", move, false);
        }
    }
}



function startDrag(e) {
    timeLabelStart = t1.querySelector(".taskBlockTimeStart");
    timeLabelEnd = t1.querySelector(".taskBlockTimeEnd");

    if (e.target.classList.contains("draggable") && !isChangingSize) {
        var dragRect = t1.getBoundingClientRect();
        movementInitClickX = e.clientX - dragRect.left;
        movementInitClickY = e.clientY - dragRect.top;

        taskContainer.addEventListener("mousemove", onMovementDrag);
        MouseUpMoveEvents(stopMovementDrag, onMovementDrag, true);
    } else {
        startResizeDrag(e);
        document.body.style.cursor = "se-resize";
    }

}

function onMovementDrag(e) {
    var canvasRect = taskContainer.getBoundingClientRect();
    var x = Math.ceil((e.clientX - movementInitClickX - canvasRect.left));
    var y = Math.ceil((e.clientY - movementInitClickY - canvasRect.top));

    if (x >= 0 && x + (t1.offsetWidth) <= taskContainer.offsetWidth) {
        t1.style.left = x / taskContainer.offsetWidth * 100 + '%';
    }
    if (y >= 0 && y + (t1.offsetHeight) <= taskContainer.offsetHeight - 2) {
        t1.style.top = y + 'px';
        updateTimeLabel(y, y + t1.offsetHeight);
    }
}

function stopMovementDrag() {
    t1.style.userSelect = "auto";
    MouseUpMoveEvents(stopMovementDrag, onMovementDrag, false);
    taskContainer.removeEventListener("mousemove", onMovementDrag);
}


function startResizeDrag(e){
    initialHeight = t1.offsetHeight;
    initialClickY = e.clientY;
    initialWidth = t1.offsetWidth;
    initialClickX = e.clientX;
    isChangingSize = true;

    if(e.target.classList.contains("taskBlockDragRight")) {
        resizeW = true;
        MouseUpMoveEvents(stopResizeDrag, onResizeDrag, true);
    } else if(e.target.classList.contains("taskBlockDragBot")){
        resizeH = true;
        MouseUpMoveEvents(stopResizeDrag, onResizeDrag, true);
    } else {
        resizeW = true;
        resizeH = true;
        MouseUpMoveEvents(stopResizeDrag, onResizeDrag, true);
        MouseUpMoveEvents(stopResizeDrag, onResizeDrag, true);
    }
}


function onResizeDrag(e){
    let height = e.clientY - initialClickY + initialHeight;
    let width = e.clientX - initialClickX + initialWidth;

    if(width <= taskContainer.offsetWidth - t1.offsetLeft && resizeW){
        t1.style.width = width / taskContainer.offsetWidth * 100 + "%";
    }
    if(height <= taskContainer.offsetHeight - t1.offsetTop - 4 && resizeH){
        t1.style.height = height + "px";
        updateTimeLabel(-1,  t1.offsetHeight + t1.offsetTop);
    }
}

function stopResizeDrag(e){
    resizeW = false;
    resizeH = false;
    isChangingSize = false;
    MouseUpMoveEvents(stopResizeDrag, onResizeDrag, false);
    document.body.style.cursor = "auto";
}

function updateTimeLabel(from, to){
    if(from >= 0){
        let calcTime = CalculateTimeRelative(t1.offsetTop);
        timeLabelStart.textContent = getFormattedTime(calcTime[0], calcTime[1]);;
    }
    if(to >= 0){
        let calcTime = CalculateTimeRelative(t1.offsetTop + t1.offsetHeight);
        timeLabelEnd.textContent = `- ${getFormattedTime(calcTime[0], calcTime[1])}`;
    } 
}

function getFormattedTime(h, m) {
    let period = h < 12 ? "AM" : "PM";
    let newH = h < 13 ? h :  Math.floor(h - 12);
    let hPadded = newH.toString().length === 2 ? newH : "0" + newH;
    let mPadded = m.toString().length === 2 ? m : "0" + m;
    return `${hPadded}:${mPadded} ${period}`;
}

function CalculateTimeRelative(y){
    let currentTimeBlock = getTimeBlockBasedOnPos(y + 1);
    let precedingTotalHeight = getTimeBlockRegionHeight(0, currentTimeBlock[0] - 1);
    let relHeightToCurrTimeBlock = y - precedingTotalHeight;
    let heightToMinutes = Math.round(relHeightToCurrTimeBlock / currentTimeBlock[1] * 60);
    return [(currentTimeBlock[0] + 1), heightToMinutes];
}