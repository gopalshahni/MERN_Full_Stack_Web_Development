// Encapsulation in Js ,,, It simply means no one can take access of it out of his scope , but we can define method(function actually) to gain access of it out of the class 

class User{
    #userId = 123; // ecampsulation is declared through # in js 

    showUser(){
        return `this user id is ${this.#userId}`
    }J
    showUserId(){
        return this.#userId
    }
}

let newuser = new User 
console.log(newuser.showUserId())