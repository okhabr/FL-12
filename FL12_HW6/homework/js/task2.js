const a = +prompt('Please enter a side');
const b = +prompt('Please enter b side');
const c = +prompt('Please enter c side');

const float_check = 1;

if (isNaN(a) || isNaN(b) || isNaN(c)) {
  alert('input values should be ONLY numbers');
} else if (a % float_check !== 0 || b % float_check !== 0 || c % float_check !== 0) {
  alert('input values should be ONLY numbers');
} else if (a <= 0 || b <= 0 || c <= 0) {
  alert('A triangle must have 3 sides with a positive definite length');
} else {
  if (a + b > c & a + c >= b & b + c > a) {
    if (a === b & a === c & b === c) {
      console.log('Equilateral triangle');
    } else if (a === b || a === c || b === c) {
      console.log('Isosceles triangle');
    } else {
      console.log('Scalene triangle');
    }
  } else {
    console.log('Triangle doesn’t exist');
  }
}
