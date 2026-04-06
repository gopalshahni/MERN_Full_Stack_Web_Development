
document.addEventListener('DOMContentLoaded',()=> {
    const TaskButton = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");
    const TodoInput = document.getElementById("todo-input");

    let tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(item => renderTask(item)); 
    TaskButton.addEventListener("click", function () {
      const ToDoInputText = document.getElementById("todo-input").value.trim();
      if (ToDoInputText == "") return;

      const newTask = {
        id: Date.now(),
        text: ToDoInputText,
        completed: false,
      };
      if(!tasks.some(t => t.text === newTask.text )){
      tasks.push(newTask);
      saveTasks();
      renderTask(newTask)
      console.log(newTask);}
      else console.log('task name is same');
    
      TodoInput.value = "";
    });

    function renderTask(task){
       const li = document.createElement('li')
       li.setAttribute( 'data-id',task.id)
       li.innerHTML= `<span> ${task.text} </span> 
       <button> delete </button>
       `

       li.addEventListener('click',(e) => {
        if(e.target.tagNamee === 'BUTTON') return ;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks() // anytime we are doing any changes array we need to update it everytime 
       })

        li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation // to stop bubbling event
        tasks  = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTasks()
       }
       
       )
       list.appendChild(li)
        
    } 

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
)