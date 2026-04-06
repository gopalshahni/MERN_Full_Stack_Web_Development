document.addEventListener('DOMContentLoaded',() =>{
    const ExpenseForm = document.getElementById('expense-form');
    const ExpenseName = document.getElementById('expense-name')
    const ExpenseAmt= document.getElementById('expense-amount')
    const ExpenseList= document.getElementById('expense-list')
    const TotalDisplay= document.getElementById('total')
    const TotalAmountDisplay= document.getElementById('total-amount')

    const expenses = JSON.parse(localStorage.getItem("Expense-list")) || [];
    renderTasks()
    
    ExpenseForm.addEventListener('click',(e)=>{
        e.preventDefault()
        
        if(e.target.tagName === 'BUTTON'){
        const name = ExpenseName.value 
        const value = parseFloat(ExpenseAmt.value.trim())

        if(name !== '' && value !== '' && !isNaN(value) && value > 0){
            const list ={
                id : Date.now(),
                name, // by writing name only it is equal to name : name 
                value ,// same here 
            }
            expenses.push(list)
 
            saveTasks()
            totalprice()
            DisplayTotalprice()
            renderTasks(list)
            ExpenseName.value =''
            ExpenseAmt.value =''
        }
        else{
            console.log('please fill the form completly');
        }
    }
    })

    // deleting expense item here 
    ExpenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            const Item = expenses.find((e) => e.id === expenseId);
            expenses.pop(Item);
            totalprice()
            DisplayTotalprice()
            saveTasks()
            e.target.parentNode.remove()
        }
        // another form to remove item from expenses using filter 
        // if(e.target.tagName === 'BUTTON'){
        //     const expenseId = parseInt(e.target.getAttribute("data-id"));
        //     expenses = expenses.filter(expense => expense.id !== expenseId) creating new array here 
        //     renderTasks()
        //     DisplayTotalprice()
        //     saveTasks()
        // }
        
    })
    
    function totalprice (){
        return expenses.reduce((sum,value)=> sum + value.value ,0)
    }
    function DisplayTotalprice(){
        let finalPrice = totalprice()
        TotalAmountDisplay.innerText = finalPrice.toFixed(2);
    }

    function renderTasks (){
        ExpenseList.innerHTML = ''
        expenses.forEach(element => {
            const li = document.createElement("li");
            li.innerHTML = `<span> ${element.name} - $${element.value}</span> <button data-id = "${element.id}"> Delete</button`;
            ExpenseList.appendChild(li);
        });
        
    }
    function saveTasks (){
        localStorage.setItem('Expense-list',JSON.stringify(expenses))
        }
})