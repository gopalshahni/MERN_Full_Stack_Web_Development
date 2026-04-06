// // function CallMyName() {
// //     console.log("G");
// //     console.log("O");
// //     console.log("P");
// //     console.log("A");
// //     console.log("L");
// // }

// // CallMyName // this is just a refernce to the function, it will not execute the function
// // CallMyName(2) // this will execute the function and print the name "GOPAL" in the console

// // function add(x = 0,y = 0)// this is a function that takes two parameters x and y, and returns their sum. If no parameters are provided, it will default to 0. so now if condition will not be true and it will return 0+0=0
// //  {
// //     if (typeof x !== "number" || typeof y !== "number") {
// //         return "Please provide numbers only";
// //     }
// //     return x+y;
// // }

// // console.log(add (123,"234"));

// function CartCalculator( price , ...quantity) {
//     return price *quantity;
// }

// console.log(CartCalculator(100, 5,)); // this will return 500;

// // ... called rest operator or spread operator depending on the context. It allows us to pass an arbitrary number of arguments to a function as an array. In this case, we are using it to calculate the total price of items in a cart by multiplying the price of each item by its quantity and summing them up.
// let obj = {
//     name: "Gopal",
//     age:22,
// }

// function  handleobject(myobject) {
//     console.log(`my name is ${myobject.name} and my age is ${myobject.age}`);
// }

// handleobject(obj);// thiw we did through a variable .
// handleobject({name:"Shivaji",age:"infinity"});// we can directly pass the object as well without storing it in a variable and also send array without storing it in a variable.
// //example of array
// function handlearray(...myarray) {
//     console.log(`my name is ${myarray[0]} and my age is ${myarray[1]}`);
// }
// handlearray("Gopal",22); // we can directly pass the array as well without storing it in a variable and also send object without storing it in a variable.

// // Two type of function declaration 

// // 1. Function Declaration
// function add(a, b) {
//     return a + b;
// }
// console.log(add(2, 3)); // 5

// // 2. Function Expression       
// const multiply = function (a, b) {
//     return a * b;
// }  
// console.log(multiply(2, 3)); // 6

// // hoisted meaning that the function declaration is moved to the top of the scope before the code is executed. This allows you to call the function before it is defined in the code. However, function expressions are not hoisted, so you cannot call them before they are defined.

// // Note: Function declarations are hoisted, which means they can be called before they are defined in the code. Function expressions, on the other hand, are not hoisted and cannot be called before they are defined.

// // Arrow function
// const divide = (a, b) => {
//     return a / b;
// }
// // another syntal for arrow function when there is only one parameter and one line of code in the function body
// const square = x => x * x;

// // another example of arrow function if you want to return value without using return keyword then you can use the following syntax
// const addTwoNumbers = (a, b) => (a + b);

// // object declaretion using arrow function
// const createObject = () => ({
//     name: "Gopal",
//     age: 22,
// })


// Immediately Invoked Function Expression (IFFE)
// IIFE is a function that is executed immediately after it is defined. It is a common pattern in JavaScript to create a new scope and avoid polluting the global scope. USECASE EXAMPLE LIKE DB CONNECTION, API CALLS, ETC.

//()();// this is an IIFE, it will execute immediately after it is defined. It is a common pattern in JavaScript to create a new scope and avoid polluting the global scope. USECASE EXAMPLE LIKE DB CONNECTION, API CALLS, ETC.
// (function db() {
//     console.log('db connected');
// }
// )();// named iife 

// // now using arrow function
// ( () => {
//     console.log('db connected using arrow function');
// }
// )()// nameless iife


// --------------Asignment from udem while learning function at section 10 v-53 ----------------
// Q1

// let teadOrder = []
// function makeTea(typeofTea){
//     teadOrder.push(typeofTea)
//     console.log(
//      `Making ${typeofTea}`)
// }

// makeTea('chai')
// console.log(teadOrder);

// Q2

// function orderTeac(teaType){
//     function confirmOrder(){
//         return `order confirmed for ${teaType}`
//     }
//     return confirmOrder()
// }

// let order = orderTeac('chai')
// console.log(order);

// Q3 
// let calculateTotal = (price,quantity) =>{return price*quantity}

// let order = calculateTotal(200, 2)
// console.log(order);

// Higher order fucntion  or First class Function 
// function printName (name){
//     return name
// }
// function greet( fn,value ){
//  return `HI ${fn ( value)} , How are you?`
// }

// let call = greet (printName,'gopal')

// console.log(call);

// another example of higher order function
function tea(teatype){
    return `making ${teatype}`
}

function createTeaMaker (fn , teatype){
    return fn(teatype)
}

let teaMaker = createTeaMaker(tea,'chai')
console.log(teaMaker);
