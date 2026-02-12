const main = document.querySelector('.task_container');
const form = document.querySelector('.form');
const toggle = document.querySelector('.toggle');
let view = "Pending";
if (!localStorage.getItem('todo')) {
    localStorage.setItem('todo', JSON.stringify([]));
}




function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('todo'));
    main.replaceChildren();

    tasks.forEach((task, index) => {
        if (view === task.status) {
            const newTask = document.createElement('div');
            newTask.classList.add('task');


            const cancelBtn = document.createElement('button');
            cancelBtn.setAttribute('class', 'deleteTask');
            cancelBtn.innerText = "X";
            cancelBtn.addEventListener('click', () => {
                console.log("Direct delete called for:", task.title);

                const currentTasks = JSON.parse(localStorage.getItem('todo'));

                currentTasks.splice(index, 1);

                localStorage.setItem('todo', JSON.stringify(currentTasks));
                renderTasks();
            })

            const newTitle = document.createElement('p');
            newTitle.innerText = task.title;

            const newDesc = document.createElement('p');
            newDesc.innerText = task.desc;

            const newDate = document.createElement('p');
            newDate.innerText = task.date;

            const markStatus = document.createElement('div');
            markStatus.setAttribute('id', 'status');

            const inputStatus = document.createElement('input');
            inputStatus.setAttribute('id', `updStatus_${index}`);
            inputStatus.type = "checkbox";
            inputStatus.addEventListener('change',(e)=>{
                const currentTasks = JSON.parse(localStorage.getItem('todo'));
                currentTasks[index].status = e.target.checked ? "Completed" : "Pending";
                localStorage.setItem('todo', JSON.stringify(currentTasks));
                renderTasks();
            })

            const labelStatus = document.createElement('label');
            labelStatus.innerText = "Mark done";
            labelStatus.setAttribute('for', `updStatus_${index}`);

            markStatus.appendChild(labelStatus);
            markStatus.appendChild(inputStatus);

            const lineBreak = document.createElement('hr');
            const lineBreak2 = document.createElement('hr');
            const lineBreak3 = document.createElement('hr');

            newTask.appendChild(cancelBtn);
            newTask.appendChild(newTitle);
            newTask.appendChild(lineBreak);
            newTask.appendChild(newDesc);
            newTask.appendChild(lineBreak2);
            newTask.appendChild(newDate);

            if (task.status === "Pending") {
                newTask.appendChild(lineBreak3);
                newTask.appendChild(markStatus);
            }

            main.appendChild(newTask);
        }
    });
}

toggle.addEventListener('click', (e) => {
    if (e.target.innerText === "View Completed") {
        view = "Completed";
        e.target.innerText = "View Pending";
        e.target.classList.remove("toggle_completed")
        e.target.classList.add("toggle_pending")
    } else {
        view = "Pending";
        e.target.innerText = "View Completed";
        e.target.classList.remove("toggle_pending")
        e.target.classList.add("toggle_completed")
    }
    renderTasks();
})



form.addEventListener('submit', (e) => {
    console.log("add task called");
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const date = document.querySelector('#date').value;

    const newTask = {
        title, desc, date, "status": "Pending"
    }

    const tasks = JSON.parse(localStorage.getItem('todo'));
    tasks.unshift(newTask);
    localStorage.setItem('todo', JSON.stringify(tasks));

    form.reset();
    renderTasks();
});

renderTasks();


















