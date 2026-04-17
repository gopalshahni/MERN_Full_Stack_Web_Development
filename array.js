// let myHeros = ["spiderman", "ironman", "thor", "hulk", "captain america"];
// //Note: arrays holds shallow copy(actual aadress) of the data , which means if we change the data in one array it will reflect in another array as well if both arrays are pointing to the same reference in memory.

// console.log(myHeros);
// console.log(`this is the length of heroes name`,myHeros.length);

// for(let i=0; i<myHeros.length; i++){
//     console.log(`${i + 1}`,myHeros[i]);
// }

let nuArray = [1,2,3,4,5];

console.log('original',nuArray);
// Slice and Splice Difference 
let a1 = nuArray.slice(0,3);
console.log('Slice',a1);
console.log('after slice original array',nuArray);

let a3 = nuArray.splice(0, 3);
console.log('Spliced array',a3);
console.log('after splice original array',nuArray);

// Use of Push and pop.
//Push adds element at the end of the array and pop removes the last element from the array.
let a2 = [1,2,3,4,5];
a2.push(6);
console.log('after push',a2);
a2.pop();
console.log('after pop',a2);


// new functions of array are join() and concat(),both are used to add two or more arrays together, but they work differently and difference is that join() method is used to join all the elements of an array into a string and returns the string, while concat() method is used to merge two or more arrays and returns a new array.  

// Flat() method is used to flatten a nested array into a single level array. It takes an optional argument that specifies the depth level to flatten the array. If no argument is provided, it flattens the array to a depth of 1.

let arr = [1,2,[3,4 ,[7,8,9]],[5,6]];
console.log('original array',arr);
let flatArr = arr.flat(Infinity);// infinity is used to flatten the array to any depth level, it will flatten all the nested arrays regardless of their depth.
console.log('flattened array',flatArr);