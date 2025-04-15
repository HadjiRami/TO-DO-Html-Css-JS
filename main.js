let taskInput = document.getElementById('taskInput')
let addBtn = document.getElementById('addBtn')
let taskList= document.getElementById('taskList')
let list = JSON.parse(localStorage.getItem('tasks')) || []
let isEditing = false
let currentIndex = null

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(list))
}
function clearInput(){
    taskInput.value = ''
}
function showTasks(){
    taskList.innerHTML = ''
    list.array.forEach(taskInput,index) => {
        let tasktaskItem = document.createElement('li')
        taskItem.innerHTML = `
        <div> <input class="checkbox active" type="checkbox" />
            <p>${task}</p>
          </div>
          <span>
          <i onclick="updateTask(${index})" class="fa-solid fa-pen update"></i>
        <i onclick="removeTask(${index})" class="fa-solid fa-trash-can delete"></i>
          </span>
        `
        taskList.appendChild(tasktaskItem)
        
    }
}

function showAlert(message, tybe){
    // Check for and remove a previous alert before adding a new one
    let existingAlert = document.querySelector('.alertBox')
    if (existingAlert) existingAlert.remove()
}
// Creating an alert item
let alertBox = document.createElement('div')
alertBox.classList.add('alertBox', tybe)
alertBox.innerHTML=`<span>${message}</span>
    <button class="close-btn">&times;</button>`
    document.body.appendChild(alertBox)

    setTimeout(()=>{
        alertBox.remove()
    },300)

    function addTasks(){
        let taskText = taskInput.value.trim()
        if (taskText ===''){
            showAlert('Can"t add an empty task!', 'error')
            return
        }
        if(isEditing){
            list[currentIndex] = taskText
            addBtn.textContent = 'Add'
            isEditing = false
            currentIndex = null
            showAlert('Task added','success')

        }else{
            list.push(taskText)
            showAlert('Task added', 'success')
        }
        saveTasks()
        showTasks()
        clearInput()
    }
    function removeTask(index) {
        list.splice(index, 1)
        showAlert('Task deleted', 'warning')
        saveTasks()
        showTasks()
      }
      function updateTask(index) {
        taskInput.value = list[index]
        createBtn.textContent = 'Update'
        isEditing = true
        currentIndex = index
      }
      
      showTasks()