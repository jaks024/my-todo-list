import { SaveAllCollection } from './ToDoCollectionManager.js';


const minimizeBtn = document.getElementById('minimizeTitleBarBtn');
const maximizeBtn = document.getElementById('maximizeTitleBarBtn');
const exitBtn = document.getElementById('exitTitleBarBtn');
minimizeBtn.onclick = minimize;
maximizeBtn.onclick = maximize;
exitBtn.onclick = exit;

const { remote } = require('electron');

function minimize(){
    SaveAllCollection();
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximize(){
    SaveAllCollection();
    let currentWindow = remote.BrowserWindow.getFocusedWindow();
    if(currentWindow.isMaximized()){
        remote.BrowserWindow.getFocusedWindow().unmaximize();
    }
    else{
        remote.BrowserWindow.getFocusedWindow().maximize();
    }
    
}

function exit(){
    SaveAllCollection();
    setTimeout(function(){
        remote.BrowserWindow.getFocusedWindow().close();
    }, 250);
}