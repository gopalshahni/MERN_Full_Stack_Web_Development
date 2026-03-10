// let a = 10;
// const b = 20;
// var c = 70;

// if (true) {
//     let a = 40; 
//     const b = 50;
//     var c = 60; 
// };

// console.log(a); // 10
// console.log(b); // 20
// console.log(c); // 60, because var is function-scoped and gets hoisted, so it overwrites the previous value of c in the global scope. so it is not good to user var in production code. It is better to use let and const to avoid such issues.

// Nested scope example
// Note: chote scope bade se ice cream le sakte hai but bade scope chote se ice cream nahi le skte.

function outerFunction() {
    let outerVariable = 'I am from outer function';
    function innerFunction() {
        let innerVariable = 'I am from inner function';
        console.log(outerVariable);
    };
    innerFunction();
    // console.log(innerVariable);
};
outerFunction(); // This will throw an error because innerVariable is not defined in the outerFunction scope. It is only accessible within the innerFunction scope.

