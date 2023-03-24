console.log('Suscríbete al canal y dale me gusta 😍')

const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listTasks = document.getElementById('list-tasks')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tasks = {}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    addTasks()
})

document.addEventListener('click', e => {
    btnAction(e)
})

formulario.addEventListener('submit',e => {
    e.preventDefault()
    setTarea(e)
})

const setTarea = e => {
    if(input.value.trim() === ''){
        return
    }

    const task = {
        id: Date.now(),
        text: input.value,
        state: false
    }

    tasks[task.id] = task
    console.log('diste clicked')
    formulario.reset()
    input.focus()
    addTasks()
}


const addTasks =  () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
    if (Object.values(tasks).length === 0) {
        listTasks.innerHTML = `
        <div class="alert alert-dark text-center">
        Sin tareas pendientes 😍
        </div>
        `
        return
    }
    listTasks.innerHTML=''
    Object.values(tasks).forEach(task =>{
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = task.text

        if(task.state){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = task.id
        clone.querySelectorAll('.fas')[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    listTasks.appendChild(fragment)

}

const btnAction = e => {
    if(e.target.classList.contains('fa-check-circle')){
        tasks[e.target.dataset.id].state = true
        addTasks()

    }

    if(e.target.classList.contains('fa-minus-circle')){
        delete tasks[e.target.dataset.id]
        addTasks()
    }

    if(e.target.classList.contains('fa-undo-alt')){
        tasks[e.target.dataset.id].state = false
        addTasks()

    }
    e.stopPropagation()
}