const t1 = document.getElementById("t1");

const taskContainer = document.getElementById("taskContainer");
taskContainer.addEventListener('mousemove', udpateDrag);

function udpateDrag(e){
    if(dragging){
        onDrag(e);
    }
}

//document.addEventListener('mousemove', onMouseMove);

var dragging = false;

function startDrag(e){
    if(!e.target.classList.contains("draggable")){
        return;
    }
    
    dragging = true;

    var dragRect = t1.getBoundingClientRect();
    clickX = e.clientX - dragRect.left; //x position within the element.
    clickY = e.clientY - dragRect.top;  //y position within the element.

}

var clickX;
var clickY;

function onDrag(e) {
    if(!dragging){
        return;
    }
    var canvasRect = taskContainer.getBoundingClientRect();

    var x = e.clientX - clickX - canvasRect.left;
    var y = e.clientY - clickY - canvasRect.top;
    t1.style.left = x + 'px';
    t1.style.top = y  + 'px';
    t1.style.userSelect = "none";
    //console.log(`x:${pos.x}, y:${pos.x}`);
}

function stopDrag(){
    dragging=false;
    t1.style.userSelect = "auto";
}

t1.addEventListener("mousedown", startDrag, false);
t1.addEventListener("mouseup", stopDrag, false);
t1.addEventListener("mousemove", onDrag, false);