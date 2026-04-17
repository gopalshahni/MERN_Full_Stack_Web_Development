const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter out even numbers
const evenno = nums.filter((num)=> num % 2 === 0);
console.log(evenno); // Output: [2, 4, 6, 8, 10]

// channing in js 

let newnum = nums.map((no) => no * 10 + 1 ).filter((no) => no >= 40  );

console.log(newnum)


// reduce() in js , ex: mostly used case scenario total bill in shopping cart

// let total = nums.reduce( function(accumulater, currentval) {
//  return accumulater + currentval
// },
// accumulater = 0)
// 
// anoter way to write reduce() function

let total = nums.reduce( (acc,currval) => (acc + currval ),0)
console.log(total);