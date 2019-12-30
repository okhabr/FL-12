function getMin(){
    let smallest = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
       smallest = arguments[i] < smallest ? arguments[i] : smallest;
    }
    return smallest;
}
getMin(3, 0, -3); 