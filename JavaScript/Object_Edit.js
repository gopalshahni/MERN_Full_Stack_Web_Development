// fun thingh is we can edit our object and we can set them as iterabe or wirttable or not  a great power to objects 

// let learn through an example

// for knwoing the object property we simple use 

let a = Object.getOwnPropertyDescriptor(Math,"PI")
console.log(a)

// output will be {
//   value: 3.141592653589793,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

// So we can create ouur own object propertyl 

const myobj = {
    name: 'gopal',
    age: 22
}

// in this lets stop writable property for name 

Object.defineProperty(myobj,"name",{
    writable : false
})

myobj.name = 'hello';

console.log(myobj.name)

