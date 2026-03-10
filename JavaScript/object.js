// //singleton object

// // two methods of creating objects
// // 1. object literal
// // 2. constructor function

// // object literals
// const sym1 = Symbol("key1");
// const person = {
//     name: "Gopal",
//     [sym1] : "mykey1",// this is how we can use symbol as a key in an object, without using the square brackets it will be treated as a string key and not as a symbol key. 
//     age : 22,
//     location: "Delhi",
//     isLoggedIn : true,
//     lastLoginDays : ["Monday", "Tuesday"],
// }
// // accessing object properties basically two ways   

// console.log(person.name);// this is the dot notation and not a good practice to use this when we have to access the property dynamically
// console.log(person["name"]);// this is the bracket notation and this is the best way to access the property when we have to access the property dynamically.
// console.log(person[sym1]);
// console.log(typeof person[sym1]);

// console.log(typeof sym1);
// // methods to freeze an object
// // 1. Object.freeze() - this method will freeze the object and we cannot add, delete or modify any property of the object. within bracket we can also pass the object and the property name to freeze a specific property of the object.
// // 2. Object.seal() - this method will seal the object and we cannot add or delete any property of the object but we can modify the existing properties of the object. 
// // 3. Object.preventExtensions() - this method will prevent the extension of the object and we cannot add any new property to the object but we can delete or modify the existing properties of the object.
// console.log(0.1 + 0.2 === 0.3);

// // how to print all the properties of an object 
// // ans is object.keys() method which returns an array of all the keys of the object and we can use forEach loop to iterate over the array and print the keys and values of the object.

// // how to add to object properties
// // ans is we can simply add a new property to the object by using the dot notation or the bracket notation and assign a value to it.
// person.email = "delhi";
// person["phone"] = "1234567890";
// console.log(person);

// // Object destructuring
// // Object destructuring is a way to extract values from an object and assign them to variables. It is a convenient way to extract multiple properties from an object and assign them to variables in a single statement.

// const {name:naam, age:umar} = person;//   here we are extracting the name and age properties from the person object and assigning them to the naam and umar variables respectively.
console.log(naam);
console.log(umar);

// api(in old time it comes in xml format but now it comes in json format) we can use json formatter to understand json structure or api structure , basically a javaScript object and it could also be an array of objects, we can use object destructuring to extract values from the api response and assign them to variables.