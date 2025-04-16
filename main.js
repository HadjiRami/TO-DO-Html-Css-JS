let taskInput = document.getElementById('taskInput')
let addBtn = document.getElementById('addBtn')
let taskList= document.getElementById('taskList')
let list = JSON.parse(localStorage.getItem('tasks')) || []
let isEditing = false
let currentIndex = null
addBtn.addEventListener('click', addTasks)
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(list))
}
function clearInput(){
    taskInput.value = ''
}
function showTasks()
{
    taskList.innerHTML = ''
    list.forEach((task,index) => {
        let taskItem = document.createElement('li')
        taskItem.innerHTML = `
        <div> <input class="checkbox active" type="checkbox" />
            <p>${task}</p>
          </div>
          <span>
          <i onclick="updateTask(${index})" class="fa-solid fa-pen update"></i>
        <i onclick="removeTask(${index})" class="fa-solid fa-trash-can delete"></i>
          </span>
        `
        taskList.appendChild(taskItem)
        
    })
}
function showAlert(message, type) {
    // Check for and remove a previous alert before adding a new one
    let existingAlert = document.querySelector('.alertBox')
    if (existingAlert) existingAlert.remove()

    // Creating an alert item
    let alertBox = document.createElement('div')
    alertBox.classList.add('alertBox', type)
    alertBox.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `
    document.body.appendChild(alertBox)

    // زر الإغلاق اليدوي
    alertBox.querySelector('.close-btn').addEventListener('click', () => {
        alertBox.remove()
    })

    // إزالة التنبيه تلقائيًا بعد 3 ثوانٍ
    setTimeout(() => {
        alertBox.remove()
    }, 3000)
}

    function addTasks(){
        let taskText = taskInput.value.trim()
        if (taskText ===''){
            showAlert('Can"t add an empty task!', 'error')
            return
        }
        if (isEditing) {
            list[currentIndex] = taskText
            addBtn.textContent = 'Add'
            isEditing = false
            currentIndex = null
            showAlert('Task updated', 'success')
        }

        else{
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
        addBtn.textContent = 'Update'
        addBtn.style.backgroundColor = '#4caf50'
        isEditing = true
        currentIndex = index
      }
      
      showTasks()