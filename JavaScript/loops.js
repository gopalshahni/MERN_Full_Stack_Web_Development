// for (let index = 0; index < 10; index++) {
//     const element = array[index];
    
// }

// while (condition) {
//     // do something
//     i++ // this is important otherwise it will be infinite loop, it shoould be declared outside the loop
// }

// do {
//     // this block will be executed at least once, even if the condition is false
// } while (condition);


// const arr = [1, 2, 3, 4, 5];
// for (const element of arr) {
//     console.log(element); // 1, 2, 3, 4, 5
// }


// map 
// Note: map holds unique values and also it store the data in your order of insertion , it is iterable and also it has a size property which tells you how many key value pairs are there in the map

const myMap = new Map();

myMap.set('name','Gopal');
myMap.set('age',27);
myMap.set('city','Delhi');

// console.log(myMap);

// for (const [key,value] of myMap) {// you can create key and value variable to access the key and value of the map.
//     console.log(`${key} : ${value}`);
// }

// for (const key in object) {
//     if (!Object.hasOwn(object, key)) continue;
    
//     const element = object[key];
    
    
// }


// for Each loop 

// const myarrey = [1, 2, 3, 4, 5];

// myarrey.forEach(function handleArray(element){//can also pass index and array as parameters
//     console.log(element);
// })

// another way to write the above code is
 
// const newArray = [1, 2, 3, 4, 5];

// newArray.forEach((element) => {
//     console.log(element);
// }
// );

// another way to write the above code is

// const newArray = [1, 2, 3, 4, 5];
