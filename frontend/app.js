const list = document.getElementById("tasks");
const input = document.getElementById("title");
const addButton = document.getElementById("add");

async function loadTasks() {
  const response = await fetch("/api/tasks");
  const tasks = await response.json();

  list.innerHTML = "";
  for (const task of tasks) {
    const item = document.createElement("li");
    item.textContent = (task.done ? "[x] " : "[ ] ") + task.title;
    item.onclick = async () => {
      await fetch(`/api/tasks/${task.id}`, { method: "PATCH" });
      loadTasks();
    };
    list.appendChild(item);
  }
}

async function addTask() {
  if (input.value.trim() === "") return;
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  loadTasks();
}

addButton.onclick = addTask;
loadTasks();
