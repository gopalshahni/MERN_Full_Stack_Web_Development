// Promises has 3 states 
// pending: initial stae, neiher fulfilled nor rejected
// fulfilled : meaning that the operation was completed successfully
// rejected : meaning that the operatin failed 

// Promise is a Object

// fetch().then().catch().finally()

// // in this the fetch holds the url and then we do some work on then and we can also do cahning of then and catch() gets the error from the then() and if sometimes promise taking long time , so finally() block will be execute.

// then/resolve and catch/reject  

// chaining example

// fetch().then().then().catch(). finally()

// then()


const prom = new Promise(function (resolve, reject) {
    let error = false;
  if (!error) {
    console.log("db connected successful");
    resolve();
  } else {
    reject(console.log("not successful"));
  }
}).then((db)=>console.log(db)).catch((eror) => console.log(error)).finally(console.log('all is well'))


// there is also a good syntax stlye to write this code

const prom2 = new Promise(function (resolve, reject) {
    let error = false;
  if (!error) {
    console.log("db2 connected successful");
    resolve();
  } else {
    reject(console.log("not successful"));
  }
})
.then((db)=>console.log(db))
.catch((eror) => console.log(error))
.finally(console.log('all is well'))

// we have another method to use same method but from different function  called async and await
// mostly used in db connection , but there is neccessory to add try and catch block in your code 

async function db_connection() {
    try {
        await prom2;
        console.log(prom2)
    } catch (error) {
        console.log(error)
    }
}


// async can be declared before any functions and then it will be called as async function and we can use await keyword to particularly stop the javascript until the promise is not fulfilled in async(it also can be called as promise)

// --fetch--- working 

// fetch('some url')

// Under the hodd fetch calls two people first one is data variable (for ex : fullfiled and fullfiledNot)to store the data coming through requested url and second one is actual network request which is made by the help of web Browser/Node 

// and after all of that we have our response 