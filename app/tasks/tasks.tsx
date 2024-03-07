import { useState, useEffect } from "react";

export default function Tasks() {
  /* Use local storage. Save all tasks and their done status. */
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  /* Add a new task. */
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  /* Remove a task. */
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  /* Edit a task. */
  const editTask = (index: number) => {
    const newTasks = [...tasks];
    const updatedText = prompt("Edit task", newTasks[index].text);
    if (updatedText !== null) {
      newTasks[index].text = updatedText;
      setTasks(newTasks);
    }
  };

  /* Mark a task as done. */
  const markDone = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = true;
    setTasks(newTasks);
  };

  return (
    <div>
      <h1 className="text-2xl">Tasks</h1>
      <div className="flex items-center flex-col">
        <div className="flex">
          <input
            type="text"
            placeholder="Run the tests"
            className="input input-bordered w-full max-w-xs"
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-none p-0 m-0">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <span>{task.done ? "✅" : ""}</span>
              <span
                style={{ textDecoration: task.done ? "line-through" : "none" }}
              >
                {task.text}
              </span>
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => markDone(index)}
                disabled={task.done}
              >
                Done
              </button>
              <button className="btn btn-sm" onClick={() => editTask(index)}>
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
