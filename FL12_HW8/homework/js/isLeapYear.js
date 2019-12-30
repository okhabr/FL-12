function isLeapYear(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let result;

    if (!year) {
        result = `Invalid Date`;
    } else {
        if((year%4 === 0 && year%100 !== 0)||(year%4 === 0 && year%100 === 0 && year%400 === 0)){
            result = `${year} is a leap year`;
        } else {
            result = `${year} is not a leap year`;
        }
    }
        return result;
}
isLeapYear('2020-01-01 00:00:00');