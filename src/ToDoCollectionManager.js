import { ToDoCollection } from './ToDoCollection.js';
import { DisplayCollection } from './components/CollectionDisplayer.js';


const collectionListDiv = document.getElementById('toDoCollectionList');
const createCollectionBtn = document.getElementById('createCollectionBtn');
const nameInput = document.getElementById('listNameInputBox');
const descriptionInput = document.getElementById('listDescriptionInputBox');
createCollectionBtn.onclick = MakeCollection;

var collectionIds = [];

function MakeCollection () {
    let newCollection = new ToDoCollection;

    const id = GenerateNewCollectionId();
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

    const newDiv = document.createElement("div");
    const nameSpan = document.createElement("span");

    const nameSpanContent = document.createTextNode(name);

    nameSpan.appendChild(nameSpanContent);

    newDiv.appendChild(nameSpan);
    newDiv.classList.add('toDoCollectionItem');

    collectionListDiv.appendChild(newDiv);

    newDiv.addEventListener('click', function(){
        SwitchToCollection(newCollection);
    });
}

function GenerateNewCollectionId(){
    let min = 0;
    let max = 1000000;
    let num = 0;
    while(collectionIds.includes(num)){
        num = Math.floor(Math.random() * (max - min) + min);
    };
    return num;
}   


function SwitchToCollection(collection){
    console.log(`id:${collection.id}, name:${collection.name}, description: ${collection.description}`);
    DisplayCollection(collection);
}
