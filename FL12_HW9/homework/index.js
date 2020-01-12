//Task 1
function convert(...args) {
    let result = [];
    for (let arg of args) {
        if (typeof arg === 'number') {
            result.push(arg+'');
        } else if (typeof arg === 'string') {
            result.push( +arg) ;
        }
    }
    return result;
}

//Task 2
function executeforEach(array, func) {
    for (let element of array) {
        func(element);
    }
}

//Task 3
function mapArray(array, func) {
    let result = [];
    for (let element of array) {
       if (typeof element === 'string') {
           element = parseInt(element);
       }
       result.push(func(element));
    }
    return result;
}

//Task 4
function filterArray(array, func) {
    let result = [];
    for (let element of array) {
        if (func(element)) {
            result.push(element);
        }
    }
    return result;
}

//Task 5 
function flipOver(string) {
    let result = '';
    for (let i = string.length-1; i>=0; i--) {
        result += string[i];
    }
    return result;
}

//Task 6
function makeListFromRange(array) {
    let result = [];
    for (let i = array[0]; i <= array[1]; i++) {
        result.push(i);
    }
    return result;
}

//Task 7
function getArrayOfKeys(arrayOfObj, keyName){
    let result = [];
    for (let element of arrayOfObj) {
        if (keyName in element) {
            result.push( element[keyName] );
        }
    }
    return result;
}

//Task 8
function substitute(array) {
    const EDGE = 30;
    let result = [];
    for (let element of array) {
        result.push( element<=EDGE ? '*': element )
    }
    return result;
}

//Task 9
function getPastDay(date, daysPast) {
    const SECONDSINDAY = 86400000;
    let seconds = date.getTime();
    let secondsPast = daysPast*SECONDSINDAY;
    let result = new Date(seconds-secondsPast);
    return result.getDate();
}

//Task 10
function formatDate(date) {
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}