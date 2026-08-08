import { useEffect, useState } from "react";
import type { Task } from "@sprintiq/shared-types";
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load tasks:", error);
        setLoading(false);
      });
  }, []);

  async function createTask() {
    if (!title.trim()) return;

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title
      })
    });

    const newTask: Task = await response.json();

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTitle("");
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <div className="create-task">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task"
        />

        <button onClick={createTask}>
          Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;