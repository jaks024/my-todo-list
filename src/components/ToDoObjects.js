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
    this.startTime = 0;
    this.endTime = 0;
    this.zIndex = 0;
    this.width = 50;
}