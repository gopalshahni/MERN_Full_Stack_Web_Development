// Rule no 1 everything in javascirpt is object , function,arrary,string ,everything is object

// Javascipt is prototyping inherience language in lehman language javascript jab tak dhundhta rehta hai jab tak usse null na mil jaye every thing inherted prototype or objects 

// ex = function,array,string ------>object --->null 

// ex for function

function add5(num) {
    return num+5
}

const power = add5().power = 2;
const length = add5().prototype
console.log(add5(5));

console.log(power);
console.log(length);