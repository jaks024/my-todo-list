import { InitDisplayer } from './CollectionDisplayer.js';
import { InitCollection } from './ToDoCollectionManager.js';

document.addEventListener("DOMContentLoaded", initialize, false);

function initialize(){
    console.log('loaded');
    InitDisplayer();
    InitCollection();
}