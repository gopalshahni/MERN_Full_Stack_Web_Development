#Basically for ease for other programmers coming from other languages lke java or c++ , JavaScript intrdouced Class and Objects in JavaScript, But actuall under the hood , Javascirpt is using portotype 


## OOP 
- it is a style of writing the code we have so many types of different style for writing the code. 

## Object
- collection of properties and methods
-toLowerCase 

## parts of Objects
 Object literal

 -Constructor
 -Prototypes
 -classes
 -Instance(new,this)

 ## 4 pillars
Abstraction
Encapsulation
Inheritance Polymorphism

## new keyword
- create new object {} 
- constructor function called due to new keyword  
- agrguements injected in the object
- we get the object 

# this keyword 
- it tells our program about the current context of the program 

EXAMPLE 
--javascript--
funciton user(username,loginCount,isLoggedIn){
    this.username = username; // this keyword is telling our program about the current context 
    this.loginCount = loginCount
    this.isLoggedIn = isLoggedIn
}

const userOne = new user('gopal',12,true); // here new keyword is creating new object if we don't add new keyword , the userOne can be update through , if someone try to make userTwo and the userOne vlaue will be updated and that will cause problem in the produciton for developers

console.log('userOne)