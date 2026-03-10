
// Execution Context in JavaScript and this context first stored in this operator and then it will be executed and then it will be removed from the stack and then the next execution context will be executed and so on.

// Execution context is an abstract concept which holds information about the environment in which the current code is being executed and it has three components
// 1. Variable Environment : it is the place where all the variables and functions are stored and it is created during the creation phase of the execution context and it is also used to store the value of this keyword.
// 2. Scope Chain : it is the chain of all the variable environments which are accessible to the current execution context and it is used to resolve the variables and functions in the current execution context.
// 3. This Keyword : it is a special keyword which refers to the current execution context and it is used to access the properties and methods of the current execution context.

// two types of execution contexts
// global execution context
// function execution context   
// and also third type of execution context is eval execution context but we will not discuss it here

// global execution context is created when the js engine starts executing the code and it is created only once in the entire lifecycle of the program
// it has two phases
// 1. creation phase//memory phase  
// 2. execution phase

//Note : for functions there will be creation of new variable envirnoment and execution context but for global execution context there will be only one variable envirnoment and one execution context and also this will be deleted when the function end 
/*
Global Execution Context
 ├─ Memory Phase: allocate global vars/functions
 └─ Execution Phase: run code line by line
       └─ Function Call → New Execution Context
            ├─ Memory Phase: allocate local vars/functions
            └─ Execution Phase: run function code
                 └─ End → Context popped, vars eligible for GC
*/

//EXAMPLE

let val1 = 10
let val2 = 20
function sum(a, b) {
    let result = a + b
    return result
}
let output = sum(val1, val2)
console.log(output)

// now in js global execution will start and it will start memory phase and it will first allocate memory for val1=undefined ,val2=undefined ,sum= have definition of function means store whole function without thinking about memory or exec. and output = undefined  

// execution phase start;
// line 24 : val1=10 will be assigned to val1
// line 25 : val2=20 will be assigned to val2
// line 30 : sum function will be called and new execution context will be created separately for sum function and in that execution context memory phase will start and it will allocate memory for a=undefined ,b=undefined ,result=undefined and then execution phase will start and a=10 ,b=20 will be assigned to a and b respectively and then result=a+b means result=30 will be assigned to result and then return result will return 30 to output variable and then output variable will have value 30 and then console.log(output) will print 30 in the console.

// call stacks 
// It is data structure which is used to keep track of the execution contexts in the program and it works on the principle of LIFO (Last In First Out) means the last execution context which is created will be executed first and then it will be removed from the stack and then the next execution context will be executed and so on.