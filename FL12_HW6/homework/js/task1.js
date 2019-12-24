let a = prompt('Please enter a');
let b = prompt('Please enter b');
let c = prompt('Please enter c');
const one = 1;
const two = 2;
const four = 4;

if (!a || !b || !c) {
  console.log('Invalid input data');
} else {
  a = a * one;
  b = b * one;
  c = c * one;
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.log('Invalid input data');
  } else if (a === 0) {
    console.log('Invalid input data');
  } else {
    if (b === 0 & c === 0) {
      let x = 0;
      console.log(`x: ${x}`);
    } else {
      let D = b * b - four * a * c;
      console.log(D);
      if (D >= 0) {
        let d = Math.sqrt(D);
        let x1 = Math.round((-b + d) / (two * a));
        let x2 = Math.round((-b - d) / (two * a));
        console.log(`x1: ${x1} and x2: ${x2}`);
      } else {
        console.log(`no solution`);
      }
    }
  }
}
