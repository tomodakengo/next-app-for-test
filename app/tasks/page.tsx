import { useState, useEffect } from "react";

export default function Tasks() {
  /* Use local storage. Save all tasks. */
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  /* Add a new task. */
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  /* Remove a task. */
  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  /* Edit a task. */
  const editTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = prompt("Edit task", newTasks[index]) || newTasks[index];
    setTasks(newTasks);
  };

  /* Mark a task as done. */
  const markDone = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = `✅ ${newTasks[index]}`;
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
            <span>{task}</span>
            <div>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => markDone(index)}
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
