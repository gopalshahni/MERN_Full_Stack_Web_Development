import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send("server is ready")
})
// get a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
    const jokes=[
        {
            id : 1,
            title : "Why don't scientists trust atoms?",
            content : "Because they make up everything!"
        },
        {
            id : 2,
            title : "Why did the bicycle fall over?",
            content : "Because it   was two-tired!"
        },
        {
            id : 3,
            title : "What do you call a fake noodle?",
            content : "An impasta!"
        },
        {
            id : 4,
            title : "Why don't skeletons fight each other?",
            content : "They don't have the guts!"
        },
        {
            id : 5,
            title : "What do you call cheese that isn't yours?",
            content : "Nacho cheese!"
        }
    ]

    res.send(jokes)
    console.log(jokes) 
})

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running at port : ${port} j
        url : http://localhost:${port}`);
    
})