 function outer(){
    let count = 0 ;
   function inner(){
        count++
        return count
    }
    return inner
}

let call = outer()
console.log(call())
console.log(call())
console.log(call())
console.log(call())
console.log(call())
console.log(call())
console.log(call())

