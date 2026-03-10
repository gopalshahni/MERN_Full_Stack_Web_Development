function setUserName(username){
    this.username = username
}

function CreateUser(username,email,password){
    setUserName.call(this,username)
    this.email = email
    this.password = password
}

let a = new CreateUser('gopal','gs@123.com',123)

console.log( a);


// In above example we learn  about the call function which used to send  current exectuion context to another function and help the program to hold the value of called function with the help of this keyword