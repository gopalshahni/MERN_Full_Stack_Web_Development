import express from 'express'

const app = express()

const port= 5000

app.use(express.json())

let TeaData = []
let nextId = 1

// post tea data into the TeaData array while incrimenting the id 
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id: nextId++,name,price}
    TeaData.push(newTea)
    res.status(200).send(newTea)
})

// get all teas data
app.get ('/teas', (req,res)=>{
    res.status(200).send(TeaData) 
})

// get tea with id 
app.get('/teas/:id',(req,res)=>{
    const tea = TeaData.find(obj => obj.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})
// updating the array with put method 
app.put ('/teas/:id',(req,res)=>{
    const teaID = req.params.id 
    const tea = TeaData.find((obj) => obj.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Not found')
    }
    
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.delete('/teas/:id',(req,res)=>{
    const index = TeaData.findIndex(t => t.id ===parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('not found')
    }
    TeaData.splice(index,1)
    return res.status(200).send('deleted')
})
app.listen(port,()=>{
    console.log(`server is running at port : ${port}`);
})