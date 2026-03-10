//  control flow statements
// simply conditional statements
// if, else if, else
// switch statement
// if statement
console.log("Control Flow Statements");
let age = 10;   
if (age >= 18) {
    console.log("You are an adult.");
}   else {
    console.log("You are a minor.");
};

console.log("This will always be executed.");

// or and not equality operators logical operators
let isRaining = true;
let isCold = false;
if (isRaining && isCold) {
    console.log("It's a cold and rainy day.");
} else if (isRaining || isCold) {
    console.log("It's either cold or rainy.");
} else {
    console.log("It's a nice day.");
}

// switch statement
let day = 3;    
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    case 1:
        console.log("Monday");
        break;
    default:
        console.log("Invalid day");
}   

// falsey values in JavaScript: false, 0, "", null, undefined, NaN and all other values are truthy.

// Interview question or mind bender for truthy and falsey values
// ex : "0" is a string and it is truthy but 0 is a number and it is falsey
// ex : " " is a string with a space and it is truthy but "" is an empty string and it is falsey


// some times we assume that a value will be there for conditional statements like user email
let userEmail = "hi@gmail.com   "; // empty string is falsey
if (userEmail) {// here we don't check any condition but we are checking if the value is truthy or falsey
    console.log("User email is provided.");
} else {
    console.log("User email is not provided.");
}


// nullish coalescing operator (??) is used to provide a default value when the left-hand side is null or undefined

// example , we are fetching some values from our database and we want to provide a default value if the value is null or undefined.
let userName = null; // null is falsey
// which is not good because our program could be crash if we try to access userName.length or any other property of userName because it is null and it will throw an error
// so we can use nullish coalescing operator to provide a default value if userName is null or undefined
let defaultName = "Guest";
let displayName = userName ?? defaultName;

// in this case, displayName will be "Guest" because userName is null and it will use the default value provided by nullish coalescing operator
console.log(displayName); // Output: Guest

 // we can also use nullish coalescing operator with other values like undefined and what if your db returns null or undefined more than 1 time , we can use nullish operator multiple times to provide default values for all the null or undefined values
let userAge = undefined;    
let defaultAge = 18;
let displayAge = userAge ?? defaultAge ?? 20; // here we are providing a default value of 20 if userAge is undefined and defaultAge is also undefined, here code execution will select the first non-nullish value which is defaultAge and it will assign it to displayAge
console.log(displayAge); // Output: 18


// ternary operator is a shorthand for if-else statement
//condition ? true:false;

let umar = 20;

umar >=18? console.log("you are able to vote"):console.log("you are not able to vote");