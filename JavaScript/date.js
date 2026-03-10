let myDate = new Date();

console.log(`1`, myDate);// 2026-02-20T04:14:28.002Z
console.log(`2`, myDate.toJSON()); //2026-02-20T04:14:28.002Z
console.log(`3`, myDate.toISOString());//2026-02-20T04:14:28.002Z
console.log(`4`, myDate.toLocaleDateString());// 2/20/2026 Local means u will get specific data for ex here data so you will get only date
console.log(`5`,myDate.toDateString()) // Fri Feb 20 2026 , here is no local word so u will get date + day
console.log(`6`, myDate.toLocaleString());// 2/20/2026, 9:44:28 AM here u will get date + time
console.log(`7`, myDate.toLocaleTimeString());// 9:44:28 AM here u will get only time

// Note: new keyword is used to create an instance of the Date object, which represents a specific point in time. The Date object provides various methods to manipulate and format dates and times.

let mycreatedDate = new Date(1996,1,1);
console.log(mycreatedDate.toLocaleString()); // Thu Feb 01 1996

let myTimeStamp =Date.now();

console.log(myTimeStamp); // 1708422868002
console.log(mycreatedDate.getTime()); // 823728000000

// Note: The getTime() method returns the number of milliseconds since January 1, 1970, 00:00:00 UTC for the specified date. This is often referred to as a timestamp. The Date.now() method returns the current timestamp in milliseconds.

let time = myDate.toLocaleString('default',
    {day:'2-digit',
month:'2-digit',
year:'2-digit',}
);

console.log(time); // 02/20/26