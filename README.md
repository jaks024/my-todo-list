# my-todo-list
A 24 hour, non date based to do list desktop application built with Electron.
This is a personal project in attempt to recreate Google Calendar day view. 

## Download
[v1.0](https://github.com/jaks024/my-todo-list/releases/tag/v1.0)

## Features
As many lists of to dos as you want (almost), and as many tasks within one list as you want (almost) 
A draggable, flexible time scale (task dimension are scaled to the time scale)
 * a task's duration can be as small as a minute
 
Tasks can be resized (width & height) by dragging the edges (like browser window resizing)
 * Changing the height of the task changes the duration
 
Tasks can be freely moved along x and y axis
 * Tasks will be brought to the front depending on how to the right the task is (prevents overlapping)
 * Chaning the Y position of the task changes the duration period (keeping the same duration)
 
![demo1](gifs/demo1.gif)
![demo2](gifs/demo2.gif)


This project is finished, for now.

## Libraries used
[SimpleBar](https://github.com/Grsmto/simplebar)
