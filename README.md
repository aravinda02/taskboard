# Taskboard

Author: Aravind Adalarasu Last Updated: 16/07/2026

Taskboard where you can put in tasks and tick them off as soon as they're completed.

AI USED TO GENERATE README, AND DESIGN PARTS OF FRONTEND.

FastAPI backend (Python) + JavaScript frontend.

## Run
```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```
Open http://localhost:8000 (API docs at http://localhost:8000/docs).

## API
| Method | Path | Purpose |
|---|---|---|
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Create `{ "title": "..." }` |
| PATCH | /api/tasks/{id} | Toggle done |
| DELETE | /api/tasks/{id} | Delete |
