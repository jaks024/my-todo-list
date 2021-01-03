import { ToDoCollection } from './ToDoObjects.js';
import { ClosePopup } from './MenuControl.js';
import { DisplayCollection, AddTaskIdToList } from './CollectionDisplayer.js';
import { SaveCollectionToFile, LoadCollection } from './CollectionSerializer.js';
import { GenerateRandomIdNoDup } from './Utilities.js';

const collectionListDiv = document.getElementById('toDoCollectionList');
const createCollectionBtn = document.getElementById('createCollectionBtn');
const nameInput = document.getElementById('listNameInputBox');
const descriptionInput = document.getElementById('listDescriptionInputBox');
const taskContainer = document.getElementById('taskContainer');
createCollectionBtn.addEventListener("click", function(){
    if(isCollectionFormFilled()){
        MakeCollection();
        ClosePopup();
    }  
});

var collectionIds = [];
var collections = [];

const collectionIdMin = 0;
const collectionIdMax = 5000;

// expoert to initializer
export async function InitCollection(){
    let loadedColl = await LoadCollection();
    console.log(loadedColl);
    if(loadedColl){
        collections = loadedColl;
        console.log("loaded collection v");
        console.log(collections);
        collections.forEach(element => {
            console.log("made collection elem,ent " + element.id);
            CreateCollectionElement(element);
            collectionIds.push(element.id);
            element.tasks.forEach(task => {
                AddTaskIdToList(task.id);
            });
        });

        DisplayCollection(collections[0]);
        console.log("collection ids: " + collectionIds);
    }
}

export function SaveAllCollection(){
    SaveCollectionToFile(collections);
}

function isCollectionFormFilled(){
    return nameInput.value.length >= 1
}

function MakeCollection () {
    let newCollection = new ToDoCollection;

    const id = GenerateRandomIdNoDup(collectionIds, collectionIdMin, collectionIdMax);
    const name = nameInput.value
    const description = descriptionInput.value;

    collectionIds.push(id);

    newCollection.id = id;
    newCollection.name = name;
    newCollection.description = description;
    newCollection.tasks = [];

    CreateCollectionElement(newCollection);

    collections.push(newCollection);

    SaveCollectionToFile (collections);
}

function CreateCollectionElement(newCollection){
    const newDiv = document.createElement("div");
    const nameSpan = document.createElement("span");

    const nameSpanContent = document.createTextNode(newCollection.name);

    nameSpan.appendChild(nameSpanContent);

    newDiv.id = newCollection.id;
    newDiv.appendChild(nameSpan);
    newDiv.classList.add('toDoCollectionItem');

    collectionListDiv.appendChild(newDiv);

    newDiv.addEventListener('click', function(){
        SwitchToCollection(newCollection);
    });
    newDiv.addEventListener('contextmenu', function(){
        console.log("showing context menu of " + newCollection.id);
    })
}

function SwitchToCollection(collection){
    //console.log(`id:${collection.id}, name:${collection.name}, description: ${collection.description}`);
    DisplayCollection(collection);
}
