//1.Create a function which finds max element in array
const maxElement = array => Math.max(...array);

//2.Create function which copies array
const copyArray = array => [...array];

//3.Create function to enhance element with unique id.
const addUniqueId = object =>  Object.assign({uniqueId: Symbol()}, object);

//4.Write a function which regroups object properties
const regroupObject = object =>  {
   const { name:firstName, details: {id, age, university} } = object;
   return { university, user: { age, firstName, id} };
}

//5.Create a function which finds unique elements in array
const findUniqueElements = array => Array.from(new Set(array));

//6.Create a function which masks phone number, leaves only last 4 digits
const hideNumber = number => number.slice(-4).padStart(number.length,'*');

//7.Create function which has all parameters always required. If they are not - throw error.
const error = () => { throw Error('Missing property') };
const add = (numberOne = error(), numberTwo = error()) => numberOne + numberTwo; 

//8.Create a function which calls some API and logs array of ‘name’ fields in alphabetical order. Use promises.
function fetchReposPromise() {
    fetch(`https://api.github.com/users/okhabr/repos`)
        .then(response => response.json())
        .then(result => {
            result.sort();
            result.forEach( repo => console.log(repo.name)) 
        })
        .catch(err => console.log(`ERROR: ${error.stack}`))
}

//9.Rewrite previous task using async/await instead of promises
async function fetchReposAsync() {
    try {
        const request = await fetch(`https://api.github.com/users/okhabr/repos`);
        const response = await request.json();
        response.sort();
        response.forEach( repo => console.log(repo.name));
    }
    catch (err) {
        console.log(`ERROR: ${error.stack}`);
    }
}