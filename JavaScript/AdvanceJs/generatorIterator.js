// generator are functions that is denooted by * sign after function keyword 
// ex 
function* printnum() {
 yield 1;
 yield 2;
 yield 3;
}

// for printing this we have to create a object of this function and then we can use next() method to print the value one by one
let a = printnum()
console.log(a.next()) // it will print 1 and also it will return the value of done as false because there is still some value to be printed 
console.log(a.next()) // it will print 2 and also it will return the value of done as false because there is still some value to be printed 
console.log(a.next()) // it will print 3 and also it will return the value of done as false because there is still some value to be printed 
console.log(a.next()) // it will print undefined and also it will return the value of done as true because there is no value to be printed