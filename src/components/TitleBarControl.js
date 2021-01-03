const minimizeBtn = document.getElementById('minimizeTitleBarBtn');
const maximizeBtn = document.getElementById('maximizeTitleBarBtn');
const exitBtn = document.getElementById('exitTitleBarBtn');
minimizeBtn.onclick = minimize;
maximizeBtn.onclick = maximize;
exitBtn.onclick = exit;

const { remote } = require('electron');

function minimize(){
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximize(){
    let currentWindow = remote.BrowserWindow.getFocusedWindow();
    if(currentWindow.isMaximized()){
        remote.BrowserWindow.getFocusedWindow().unmaximize();
    }
    else{
        remote.BrowserWindow.getFocusedWindow().maximize();
    }
    
}

function exit(){
    remote.BrowserWindow.getFocusedWindow().close();
}