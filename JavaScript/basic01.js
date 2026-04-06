console.log();

// primitive and non primitive data types

//primitive
/*
int,boolean,string,null,undefined,symbol

non-primitive
array,object,functions */

// let arr = [2,4,6];
// let multiplliedNumbers = [];

// for(let i = 0; i < arr.length ; i++){
//     multiplliedNumbers [i] =  arr[i] * 2
// }

// console.log(  multiplliedNumbers);

// for (const num of arr) {
//     c onsole.log(num);
    
// }
let cities = {
    sydney : 234567,
    delhi : 25000000,
    Newyork : 80000000,
    punjab : 5000000 
}
let NewList ={} ;
for (const key in cities) {
    if(cities[key] <= 5000000){
        continue
    }
    NewList[key] = cities[key]
}
// Note in for in loop we use braces to access the data , '.' operater will not be used 
// console.log(NewList);

// for each loop , used on array or objects 
let tealist = ['oolong tea','match','cold cofee','chai','brew tea']
let availabetea =[];
tealist.forEach(tea => {
    if(tea === 'chai'){
        return // here we can't use break becuase we are in a arrow function right now 
    }
    availabetea.push(tea);
});

// console.log(availabetea);

// anoter for each example

let WorldCities = ['Berlin','Tokyo','Paris','sydney','delhi']
let countCity = [];
WorldCities.forEach((city)=>{
    if(city ==='sydney'){
        return
    }
    countCity.push(city)
})

// console.log(countCity);


// Qs 9 

let arr1 = [2,5,7,9]
let mularr = []
for (let i =0; i < arr1.length; i++){
    if( 7 !== arr1[i]){
        mularr.push (arr1[i] *2)
    }
    continue
}
// console.log(mularr);

// Qs 10 
let chai= ['chai','chow','oolong tea','jasmine tea','hearbal tea']
let shortTeas =[]
for (const key of chai) {
    if(key.length >= 10 ){
        break;
    }
    shortTeas.push(key)
    console.log(key);
    
}

console.log(shortTeas);
