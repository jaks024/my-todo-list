export function ToDoCollection(){
    this.id = 0;
    this.name = '';
    this.description = '';
    this.tasks = [];
}

export function ToDoTask() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.color = "0,0,0";
    this.startTime = 0;
    this.endTime = 0;
    this.startDate = "01/01/0000";
    this.endDate = "01/01/0000";
    this.zIndex = 0;
    this.width = 50;
}