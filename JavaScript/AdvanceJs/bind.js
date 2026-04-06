// simple meaning while creting object and anytime we send the object reference to another variable the new variable  will not hold the context of previous object or function . so we use bind method and it can be invoke later on and it will give new functio with new context

// ex ----

const person = {
    name : 'gopal',

    greet(){
        console.log(`my name is ${this.name}`)
    }
}

person.greet()
let newPerson =  person.greet
newPerson()

let new2Person = person.greet.bind( { name : "hello"})
new2Person()


// call in js , means it borrows the method of one object to another object and it will execute the method immediately 
// if it is depnedent on any object so we use object.fnName.call(object) 
// and it it is not dependent on any obj , we will simply call lik this fnName.call(pass the object )

 // apply in js 
//  it is same like call but the only difference is that it takes arguements in array format 
//  example  obj.apply(fnName,[state,Country])