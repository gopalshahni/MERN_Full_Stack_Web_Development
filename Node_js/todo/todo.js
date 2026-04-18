const fs = require('fs')
const path = './Node_js/todo/data.json'

const command = process.argv[2] // fetch the cmd 
const arg = process.argv[3] // fetch the argument 

const saveTasks = (Tasks) =>{
    const dataJSON = JSON.stringify(Tasks)
    fs.writeFileSync(path,dataJSON)
    console.log();
    
}

const loadTasks = () => {
    try {
       const dataBuffer =  fs.readFileSync(path)
       console.log(dataBuffer);
       
       const dataJSON = dataBuffer.toString()
       console.log(dataJSON);
       console.log(JSON.parse(dataJSON));
       
       return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}
const addTask = (Task) => {
    const tasks = loadTasks()
    tasks.push({Task})
    saveTasks(tasks)
    console.log("Task added :", Task);
    
}

if(command === 'add'){
    addTask(arg)
}else if (command === 'list'){
    listTasks()
}else if(command === 'remove'){
    removeTasks(parseInt(arg))
}else {
    console.log('command not found');
}
