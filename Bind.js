// // basically in old time for handling this context we use apply, bind, call 
// call simply takes arguements normally but for 
// apply it takes arguements in array format 

// and for bind , the word tells its meaning itself , like binding the this context to the related funcition and it will return the new function   itna sab kuch isiliye bas this apna context na bhul jaye

    const user = {
    name: 'gopal',
    surname: 'shahni'   
}

 function printname(home,state){
    console.log(` full name : ${this.name} ${this.surname},your state is ${state} and home is ${home}`)
    }

const user2 = {
    name: 'gopal',
    surname: 'shahni'   
};

let a = printname.bind(user2,"Delhi","Dilshad Garden")

a()