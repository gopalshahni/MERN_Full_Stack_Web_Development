// prototype is basically defining own methods in javascript
 // lets learn through an example
const myarr = ['ram','shyam','sita','gita'];

//for example i want to print every array 1st value at index ;
// I have to write console.log(myarr[0]) each time to print the value , rather than writing each time i can define a method in this specific function or into directly in the root , root is object actually

// for arr
Array.prototype.sayhi = function (){ console.log('hey guys')}
// just like array we can create our own method for string , function  etc

Object.prototype.greet = function (){
    console.log('hi')
}

myarr.sayhi()

greet()

// another style of creating of method for our specific object above example is for all Array and root(Object)

const User = {
  username : 'gopal',
  age : 22,
  isLoggedIn : true,
  greet : function(){
    console.log(`hi ${this.username}`)
  }
}

User.greet()
// ---inheritance---

// Old style or in old time for inheritance

// we use __proto__ ://object name  , we have to define this into our object and after this syntax we add AccessGiver variable ex: __proto__ : AccesGiver

// but in actual days in modern code 

// we use Object.setPrototypeOf( AccesTaker, AccessGiver)