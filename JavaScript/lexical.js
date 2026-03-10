// lexical scope spl case scenario hai jaha agar 2 funtion ho aor waha  funciton1 ke andar function2 declared hai toh javascript ke memory main toh function1 ke andar he function 2 memory store kr rha hai so function 1 can also access the function 2 data 


// easiest example chote bache parents se ice cream maang skte hai and parents bhi chote bache se ice cream maang skte hai ye specially in nested function , but what if do function bhai means parent ke andar child1 function() ho aor child2 function() ho , aor ham some data child1 ke pass rkhte toh , 

// child2 usse access nhi kr skta because bhai bhai aaps main share nhi krte 

// example 

function parent(){
    let papa = "papa"

    function child1(){
        let candy = 'mango bite'
        console.log(papa)
    }

    function child2(){
        console.log(papa)
        // console.log(canndy) child2 can't access child1 here 
    }
child1()
child2()
}

parent()


///closure in simple terms : 
// it returns full lexical scope while calling it 

