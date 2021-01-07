import { ToDoCollection } from './ToDoObjects.js';
import { ClosePopup, isInEditing } from './MenuControl.js';
import { DisplayCollection, 
    AddTaskIdToList, 
    collectionNameField,
    collectionDescField } from './CollectionDisplayer.js';
import { SaveCollectionToFile, LoadCollection } from './CollectionSerializer.js';
import { GenerateRandomIdNoDup } from './Utilities.js';
import { OpenContextMenuCollection, currentContextCollection } from './ContextMenuControl.js';


// to MenuControl for editing form
export const collectionNameInput = document.getElementById('collectionNameIB');
export const collectionDescInput = document.getElementById('collectionDescriptionIB');
// to menu control
export const createCollectionBtn = document.getElementById('collectionConfirmBtn');
createCollectionBtn.addEventListener("click", function(){
    if(isCollectionFormFilled()){
        if(isInEditing){
            UpdateCollection(currentContextCollection);
        } else {
            MakeCollection();
        }
        SaveCollectionToFile (collections);
        ClosePopup();
        ClearCollectionForm();
    }  
});

const collectionListDiv = document.getElementById('toDoCollectionList');

var collectionIds = [];
var collections = [];

const collectionIdMin = 0;
const collectionIdMax = 5000;

// expoert to initializer
export async function InitCollection(){
    let loadedColl = await LoadCollection();
    //console.log(loadedColl);
    if(loadedColl){
        collections = loadedColl;
       // console.log("loaded collection v");
        //console.log(collections);
        collections.forEach(element => {
           // console.log("made collection elem,ent " + element.id);
            CreateCollectionElement(element);
            collectionIds.push(element.id);
            element.tasks.forEach(task => {
                AddTaskIdToList(task.id);
            });
        });

        DisplayCollection(collections[0]);
        //console.log("collection ids: " + collectionIds);
    }
}

export function getCollection(){
    return collections;
}

export function setCollection(newCollection){
    collections = newCollection;
}

// saving remotely
export function SaveAllCollection(){
    SaveCollectionToFile(collections);
}

function isCollectionFormFilled(){
    return collectionNameInput.value.length >= 1
}

function ClearCollectionForm(){
    collectionNameInput.value = "";
    collectionDescInput.value = "";
}

function MakeCollection () {
    let newCollection = new ToDoCollection;

    const id = GenerateRandomIdNoDup(collectionIds, collectionIdMin, collectionIdMax);
    const name = collectionNameInput.value
    const description = collectionDescInput.value;

    collectionIds.push(id);

    newCollection.id = id;
    newCollection.name = name;
    newCollection.description = description;
    newCollection.tasks = [];

    CreateCollectionElement(newCollection);

    collections.push(newCollection);
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
    newDiv.addEventListener('contextmenu', function(e){
        //console.log("showing context menu of " + newCollection.id);
        OpenContextMenuCollection(e.pageX, e.pageY, newCollection);
    });
}

function UpdateCollection(collection){
    collection.name = collectionNameInput.value
    collection.description = collectionDescInput.value;
    let collElement = document.getElementById(collection.id);
    collElement.firstChild.textContent = collection.name;
    //console.log("updated " + collection.id);

    // for right panel headers
    if(currentContextCollection.id === collection.id){
        collectionNameField.textContent = collection.name;
        collectionDescField.textContent = collection.description; 
    }
}

function SwitchToCollection(collection){
    //console.log(`id:${collection.id}, name:${collection.name}, description: ${collection.description}`);
    DisplayCollection(collection);
}
