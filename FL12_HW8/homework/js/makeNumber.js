function makeNumber(someString){
    let numberString = '';
    for (let i = 0; i<someString.length; i++){
        numberString = (!!Number(someString[i])||someString[i]==='0') ? numberString+=someString[i] : numberString;
    }
    return numberString;
}
makeNumber('erer384jjjfd123');