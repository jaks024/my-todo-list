const fs = require('fs');
const path = require('path');
const electron = require('electron');

const savePath = path.join((electron.app || electron.remote.app).getPath('userData'), "save.json");

//document.addEventListener("click", SaveCollectionToFile, false);

export function SaveCollectionToFile(collection) {
    if(!collection){
        return;
    }

    let data = JSON.stringify(collection);
    fs.writeFile(savePath, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })
    console.log(path);
}

export function LoadCollection() {
    return new Promise(resolve => {
        console.log("loaded data");
        fs.readFile(savePath, 'utf8', function(err, data) {
            if(err) {
                console.log(err);
                resolve([]); 
            }
            console.log(data);
            resolve(JSON.parse(data));
        });
    });
}