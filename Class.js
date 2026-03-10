// --------------Class----------------
// when there is no class We use call method to send the data access from one object/funciton to another object/function ,
// but after ES6 we introduced with OOps style;

// Use of extend keyword is to inherit the class syntax is AccessTaker extends AccessGiver and for using the vairable we write it down in  the super keyword ex super(username,email,password , )


 ///----here is the example of extend / inheritance

// class user {
//     constructor(username,email,password){
//         this.username =username
//         this.email = email
//         this.password = password
//     }
// }

// class Teacher extends user {
//     constructor(teacherName ,username,email,password){
//         super(username,email,password)
//         this.teacherName = teacherName;''
//     }

//      logMe(){
//             console.log(`Teacher name is ${this.teacherName}`)
//         }
// }

// const newTeacher = new Teacher('Sangita','Sangita123','San@123.com',1234)

// console.log(newTeacher)

// newTeacher.logMe()




// Now suppose sometimes we don't want to give access to everybody of specific function so in that case scenario we use static keyword to restrict access 

// here is a exmaple 

class BankCustomer {
    constructor(username,email,password){
        this.username =username
        this.email = email
        this.password = password
    }
   static Bankpassword(customer){ // here static keyword will restrict other to see its bank password , it could only seen by Bank Custormer
        console.log(`your password is ${customer.password}`)
    }
}

class Bank extends BankCustomer {
    constructor(UserId ,username,email,password){
        super(username,email,password)
        this.UserId = UserId;
    }

     logMe(){
            console.log(` your user ID : ${this.UserId}`)
        }
    };

const Customer1  = new BankCustomer('Gopal','hello@gmail.com','1234')

// console.log(Customer1);
// console.log(Customer1.Bankpassword());
const BankUser = new Bank ('user123','ram','ram@123.com',213)
// console.log(BankUser.logMe())

console.log(BankCustomer.Bankpassword(Customer1))
