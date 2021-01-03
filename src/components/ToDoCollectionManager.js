import { ToDoCollection } from './ToDoObjects.js';
import { DisplayCollection } from './CollectionDisplayer.js';
import { SaveCollectionToFile, LoadCollection } from './CollectionSerializer.js';


const collectionListDiv = document.getElementById('toDoCollectionList');
const createCollectionBtn = document.getElementById('createCollectionBtn');
const nameInput = document.getElementById('listNameInputBox');
const descriptionInput = document.getElementById('listDescriptionInputBox');
const taskContainer = document.getElementById('taskContainer');
createCollectionBtn.onclick = MakeCollection;

var collectionIds = [];
var collections = [];

document.addEventListener("beforeunload", function (){
    SaveCollectionToFile(collections);
    console.log("saved to file during unload");
}, false);


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
        });

        DisplayCollection(collections[0]);
    }
}

export function SaveAllCollection(){
    SaveCollectionToFile(collections);
}

export function GenerateNewCollectionId(coll){
    let min = 0;
    let max = 1000000;
    let num = 0;
    while(coll.includes(num)){
        num = Math.floor(Math.random() * (max - min) + min);
    };
    return num;
}   

function MakeCollection () {
    let newCollection = new ToDoCollection;

    const id = GenerateNewCollectionId(collectionIds);
    const name = nameInput.value
    const description = descriptionInput.value;

    if(name === "" || description === ""){
        return;
    }

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
}

function SwitchToCollection(collection){
    //console.log(`id:${collection.id}, name:${collection.name}, description: ${collection.description}`);
    DisplayCollection(collection);
}
