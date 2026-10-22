interface Task {
  id: number;
  title: string;
  done: boolean;
}

const list = document.getElementById("tasks") as HTMLUListElement;
const input = document.getElementById("title") as HTMLInputElement;
const addButton = document.getElementById("add") as HTMLButtonElement;

async function loadTasks() {
  const response = await fetch("/api/tasks");
  const tasks: Task[] = await response.json();

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
