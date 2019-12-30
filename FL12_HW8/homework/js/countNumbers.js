function countNumbers(someString){
    let numberObject = {};
    for (let i = 0; i<someString.length; i++){
        if(!!Number(someString[i])||someString[i]==='0'){
            numberObject[`'${someString[i]}'`] = (!numberObject[`'${someString[i]}'`]) ? 
            1: numberObject[`'${someString[i]}'`]+=1;
        }
    }
    return numberObject;
}
countNumbers('erer384jj4444666888jfd123');