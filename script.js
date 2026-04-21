let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerText = task.title + " (" + task.time + ")";
    if (task.completed) {
      text.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function addTask() {
  const title = document.getElementById("taskInput").value;
  const time = document.getElementById("timeInput").value;

  if (title === "" || time === "") {
    alert("Please enter task and time");
    return;
  }

  tasks.push({
    title,
    time,
    completed: false
  });

  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("timeInput").value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();