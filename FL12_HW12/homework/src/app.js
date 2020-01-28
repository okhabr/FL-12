//Set base hash
location.hash = '/main';
window.onhashchange = locationHashChanged;
document.addEventListener('DOMContentLoaded', buildSetList);

//PAGES
let addNewSetPage = document.querySelector('#add-set');
let modifyPage = document.querySelector('#modify-set');
let mainPage = document.querySelector('#main-page');

//MAIN PAGE
let addNewSetButton = document.querySelector('.add-new-set');
let setList = document.querySelector('.sets-list');

//Build setlist from local storage
function buildSetList() {
    setList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++){
        let setName = localStorage.key(i);
        let setContainer = document.createElement('li');
        setContainer.innerHTML = `<p class='set-text'>${setName}</p> 
        <button class='edit'>E</button> <button class='remove'>R</button>`;
        setContainer.classList.add('set');
        setList.append(setContainer);
    }
}

//Handle modify and remove sets
setList.addEventListener('click', RemoveSet);
setList.addEventListener('click', ModifySet);

function RemoveSet(e){
    if (e.target.className === 'remove') {
        localStorage.removeItem(e.target.parentElement.firstElementChild.textContent);
        e.target.parentElement.remove();
    }
}

function ModifySet(e){
    if (e.target.className === 'edit') {
        location.hash = '/modify';
        mainPage.classList.toggle('hidden');
        modifyPage.classList.toggle('hidden');
        let setName = e.target.parentElement.firstElementChild.textContent;
        buildEditSet(setName);
    }
}

//Handle adding new set
addNewSetButton.addEventListener('click', () => {
    addNewSetPage.classList.toggle('hidden');
    mainPage.classList.toggle('hidden');
    document.location.hash = '/add';
})

// ADD NEW PAGE
let addNewTerm = document.querySelector('.add-new-term');
let cancelAddingSet = document.querySelectorAll('.cancel');
let saveSetButton = document.querySelector('.save-changes');
let nameSet = document.querySelector('.set-name');
let termsAddList = document.querySelector('#add-set .terms-list');

//Add one new term
addNewTerm.addEventListener('click', () => {   
   let newTermLine = document.createElement('div');
   newTermLine.classList.add('new-term-line');

   let termName = document.createElement('input');
   termName.classList.add('term-name');
   termName.setAttribute('type','text');

   let termDefinition = document.createElement('input');
   termDefinition.setAttribute('type','text');
   termDefinition.classList.add('term-definition');

   let termDelete = document.createElement('button');
   termDelete.classList.add('delete-term');
   termDelete.innerHTML = 'X';

   newTermLine.append(termName,termDefinition,termDelete);
   termsAddList.append(newTermLine);

   termDelete.addEventListener('click', (e) => {
    e.target.parentElement.remove();
   })
})

//Handle cancel button for ADD NEW AND MODIFY pages
cancelAddingSet.forEach( button => button.addEventListener('click', e => {
    redirectToMain(e);
    clear(e);
}));

//Save button (to local storage)
saveSetButton.addEventListener('click', (e) => {
    let setName = nameSet.value;
    if (setName) {
    let setTerms = {};
    document.querySelectorAll('.new-term-line').forEach(item => {
        setTerms[item.children[a].value] = item.children[b].value;
    })
    localStorage.setItem(setName, JSON.stringify(setTerms));
    //Clear all 
    nameSet.value = '';
    document.querySelectorAll('.new-term-line').forEach(item => {
        item.remove();
    })
    redirectToMain(e);
    } else {
        alert('Please name your set');
    }
})

//EDIT PAGE
let saveModifications = document.querySelector('.save-modifications');
let termsEditList = document.querySelector('#modify-set .terms-list');
const a = 0;
const b = 1;

//Create list of terms of one set
function buildEditSet (setName) {
    document.querySelector('#modify-set h1').innerHTML = setName;
    let termList = JSON.parse(localStorage.getItem(setName));
    let keys = Object.keys(termList);
    for (let key of keys) {
        let termLine = document.createElement('div');

        termLine.classList.add(`old-term-line`);
        let termName = document.createElement('input');
        termName.setAttribute('type','text');
        termName.classList.add(`term-name`);
        termName.value = key;

        let termDef = document.createElement('input');
        termDef.setAttribute('type','text');
        termDef.classList.add(`term-definition`);
        termDef.value = termList[key];

        let deleteBtn = document.createElement(`button`);
        deleteBtn.innerHTML = `X`;
        deleteBtn.classList.add(`delete-term`);
        deleteBtn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
        termLine.append( termName, termDef, deleteBtn );
        termsEditList.append(termLine);
    }   
}  

saveModifications.addEventListener('click', (e) => {
    let setName = document.querySelector('#modify-set h1');
    let setTerms = {};
    document.querySelectorAll('.old-term-line').forEach(item => {
        setTerms[item.children[a].value] = item.children[b].value;
    })
    localStorage.setItem(setName.textContent, JSON.stringify(setTerms));
    //Clear all
    setName.innerHTML = '';
    document.querySelectorAll('.old-term-line').forEach(item => {
        item.remove();
    })
    redirectToMain(e);
})

//SHARED FUNCTIONS
function redirectToMain(e) {
    e.target.parentElement.classList.toggle('hidden');
    mainPage.classList.toggle('hidden');
    document.location.hash = '/main';
}

function clear(e) {
    e.target.nextElementSibling.innerHTML = '';
}

function locationHashChanged () {
    if (location.hash === '#/main') {
        buildSetList();
    }
}