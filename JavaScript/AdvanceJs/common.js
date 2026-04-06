// used how to import and export code in js 

// named export and import 
import mul from "./math.js"
import {add, sub} from "./math.js"
console.log(mul(2,3));
// console.log(add(2,3));

// now in es6 modules we use module.exports = {} to export any function or varialbe even we have to export only single function or variable we will use module.exports ={}

function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

module.exports = {
    add,
    sub
}


/// for importing latest export type we use require()

const math= require("./math.js")