const addTodoButton = document.querySelector('#addTodoBtn')
const todoInput = document.getElementById("todoInput");
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const pendingTasksContainer = document.getElementById("pendingTasks");
const completedTasksContainer = document.getElementById("completedTasks");

let todo = {}

function formatTimestamp(timestamp) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(timestamp).toLocaleString(undefined, options);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
})
addTodoButton.addEventListener('click', addTodo);
addTodoButton.className = 'btn btn-info'
function addTodo() {
    let inputText = todoInput.value.trim();
    if (inputText !== "") {
        todo = {
            text: inputText,
            timestamp: new Date(),
            completed: false
        };
        todoInput.focus();
        todos.unshift(todo);
        updateTodos();
        todoInput.value = "";
        saveToLocalStorage();
    }else{
        Swal.fire("Add any task buddy📝!");
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    updateTodos();
    saveToLocalStorage();
}

function completeTodo(index) {
    todos[index].completed = !todos[index].completed; // Toggle the completion status
    updateTodos();
    saveToLocalStorage();
}

function editTodo(index) {
    const todoElement = document.getElementById("todo-" + index);

    if (todoElement) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todos[index].text;
        editInput.className = "editInput form-control";

        const saveBtn = document.createElement("button");
        saveBtn.innerHTML = "Save";
        saveBtn.className = "saveTaskBtn btn btn-info";
        saveBtn.addEventListener('click', () => {
            todos[index].text = editInput.value;
            updateTodos();
            saveToLocalStorage();
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.className = "cancelTaskBtn ms-1 btn btn-secondary";
        cancelBtn.addEventListener('click', () => {
            updateTodos();
        });


        todoElement.innerHTML = "";


        todoElement.appendChild(editInput);
        todoElement.appendChild(saveBtn);
        todoElement.appendChild(cancelBtn);

        editInput.focus();
    }
}


function updateTodos() {

    pendingTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";

    todos.forEach(function (todo, index) {
        const todoElement = document.createElement("div");
        todoElement.className = "todo" + (todo.completed ? " completed" : "");
        const elementId = `todo-${index}`
        todoElement.setAttribute('id', elementId)


        const actionsElement = document.createElement("div");
        actionsElement.className = "taskActions";

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "task-Btn btn btn-danger";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener('click', () => {
            deleteTodo(index)
        })

        const editBtn = document.createElement("span");
        editBtn.className = "task-btn ms-1 btn btn-primary"
        editBtn.innerText = "Edit"
        editBtn.addEventListener('click', () => {
            editTodo(index);
        })


        const completeBtn = document.createElement("span");
        completeBtn.className = "task-btn btn btn-success ms-1";
        completeBtn.innerText = todo.completed ? "Undo" : "Complete";
        if (completeBtn.innerText === 'Undo') {
            completeBtn.className = "task-btn ms-1 btn btn-warning";
        }
        completeBtn.addEventListener('click', () => {
            completeTodo(index)
        })

        actionsElement.appendChild(deleteBtn);
        actionsElement.appendChild(editBtn)
        actionsElement.appendChild(completeBtn);

        const timestampElement = document.createElement("small");
        timestampElement.textContent = formatTimestamp(todo.timestamp);
        todoElement.innerHTML = "<span>" + todo.text + "</span>" + "<small>" + timestampElement.textContent + "</small>"
        todoElement.appendChild(actionsElement);

        if (todo.completed) {
            completedTasksContainer.appendChild(todoElement);
        } else {
            pendingTasksContainer.appendChild(todoElement);
        }
    });
}


if (!localStorage.getItem('todos')) {
    todos.push({ text: "Sample Task 1", timestamp: new Date(), completed: false });
    todos.push({ text: "Sample Task 2", timestamp: new Date(), completed: true });
}


function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        updateTodos();
    }
}

loadFromLocalStorage();

