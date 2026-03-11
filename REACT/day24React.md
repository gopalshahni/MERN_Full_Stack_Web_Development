# Day 24 of Learning MERN Stack 

## REACT got know about folder structure 
 - rule no 1 , always keep first letter of your component(file) & Function Name Capital while using it anywhere for ex. import , export <App/>
 - delete all things that you're not going to use 

## JSX and JS both are similar 
- Some libraryies force you to create your file in .jsx and It is also a good practice to create .jsx files while writing html in it, if you're not writing html in it keep it .js only

## npx Creat-react-app and npm run vite bundler difference
- Vite : It is so lite compared to default react and for injecting js in html we have script file address to attach to the html page and in other case scenario for Default React it has scripts that automatically inject react js script in htmls    

## Another rule : 
- You can only return one element in return function 
- for ex 
```javascript 

function print(){
    return (
        <h1> or (element) <hello_world/>
    )
}

- but it is not a good practice , so we will just simply use fragrments "<> you can use multiple functions/components  here inside this </>" , Majorly to solve the issue of sending only element at start we use div to send multiple items , but after sometime react introduce <> as fragements and you can send nou multiple items , basically they are divs here is a code example 

function print(){
    return (
        <>
        hi
        <hello/>
        <h1> hello </h1>
        </>
    )
}