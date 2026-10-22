from pathlib import Path
from itertools import count

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

app = FastAPI(title="Taskboard API")

class TaskIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)

class Task(TaskIn):
    id: int
    done: bool = False

_ids = count(1)
tasks: dict[int, Task] = {}

@app.get("/api/tasks", response_model=list[Task])
def list_tasks():
    return list(tasks.values())

@app.post("/api/tasks", response_model=Task, status_code=201)
def create_task(body: TaskIn):
    task = Task(id=next(_ids), title=body.title.strip())
    tasks[task.id] = task
    return task

@app.patch("/api/tasks/{task_id}", response_model=Task)
def toggle_task(task_id: int):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(404, "Task not found")
    task.done = not task.done
    return task

@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    if tasks.pop(task_id, None) is None:
        raise HTTPException(404, "Task not found")

# Serve the compiled frontend at / (registered last so /api wins)
app.mount("/", StaticFiles(directory=Path(__file__).parent.parent / "frontend", html=True), name="web")
