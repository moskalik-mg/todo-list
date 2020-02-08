const input = document.querySelector('#task')  //input
const buttonAdd = document.querySelector('#addTask')  // button add
const KEY_LOCAL_STORAGE = 'arrayTasks'
const arrayTasks = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || []
const todoList = document.querySelector('.todo-list')

render(arrayTasks);

input.addEventListener('input', () => {
    let valueInput = input.value
    if(valueInput < 1){
        buttonAdd.setAttribute('disabled', 'disabled')
    }
    else{
        buttonAdd.removeAttribute('disabled')
    }
    
});

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault()
    addTask()
});

function createList(name){
    return {id: Date.now().toString(), task: name}
}

function saveToStorage(array){
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(array));
}

function render(arrayTasks){

    todoList.innerHTML = ''

    arrayTasks.forEach((element, index) => {
        
        const block  = 
        `<div class="todo-item card">
            <div class="card-body">
                <div class="todo-name card-title">
                    Name 1
                </div>
                <div class="todo-description">
                    ${element.task}
                </div>
            </div>
            <div class="button-controls">
                <div class="edit-card"><i class="fas fa-pencil-alt"></i></div>
                <div class="remove-card"><i class="fas fa-trash-alt"></i></div>
            </div>
        </div>`;
        
        todoList.insertAdjacentHTML('afterbegin', block);

        const clearButton = document.querySelector(".remove-card");
        clearButton.addEventListener('click', () => {
            arrayTasks.splice(index, 1);  
            localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(arrayTasks));
            render(arrayTasks);
        });
        
    });
    

}

function addTask(){
    let valueInput = input.value;
    if(valueInput < 1){
        alert('Хорошая попытка, но нет)');
        buttonAdd.setAttribute('disabled', 'disabled');
        return false
    }
    else{
        const list = createList(valueInput);
        arrayTasks.push(list);
        saveToStorage(arrayTasks);
        render(arrayTasks)
        input.value = '';
        buttonAdd.setAttribute('disabled', 'disabled');
    }    
}





