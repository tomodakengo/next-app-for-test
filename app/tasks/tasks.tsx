import { useState, useEffect } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>(() => {
    const savedTasks = window.localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [
        { text: "Run the tests", done: true },
        { text: "Deploy the app", done: false },
      ];
    }
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Run whenever tasks change

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
      newTasks[index].done = false;
      setTasks(newTasks);
    }
  };

  /* Mark a task as done. */
  const markDone = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = true;
    setTasks(newTasks);
  };

  /* Done count */
  const doneCount = tasks.filter((task) => task.done).length;
  /* Total tasks */
  const totalTasks = tasks.length;
  /* Remaining tasks */
  const remainingTasks = totalTasks - doneCount;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/4">
        <div>
          <div className="stat">
            <div className="stat-value" data-testid="label-percentage-of-done">
              {((doneCount / totalTasks) * 100).toFixed(0)}%
            </div>
            <div className="stat-title">Tasks done</div>
            <div
              className="stat-desc text-secondary"
              data-testid="label-tasks-remaining"
            >
              {remainingTasks} tasks remaining
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-3/4">
        <div className="flex items-center flex-col">
          <div className="flex join">
            <input
              type="text"
              placeholder="Run the tests"
              className="input input-bordered w-full max-w-xs join-item"
              value={newTask}
              onChange={handleInputChange}
              data-testid="input-new-task"
            />
            <button
              className="btn btn-primary join-item"
              onClick={addTask}
              data-testid="button-add-new-task"
            >
              Add
            </button>
          </div>
        </div>
        <ul className="list-none p-0 m-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-1"
              data-testid={`list-task-${index}`}
            >
              <div>
                <span data-testid={`icon-done-of-task-${index}`}>
                  {task.done ? "✅" : ""}
                </span>
                <span
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                  data-testid={`label-task-${index}`}
                >
                  {task.text}
                </span>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-outline mr-1"
                  onClick={() => markDone(index)}
                  disabled={task.done}
                  data-testid="button-done-of-task"
                >
                  Done
                </button>
                <button
                  className="btn btn-sm mr-1"
                  onClick={() => editTask(index)}
                  data-testid="button-edit-of-task"
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => removeTask(index)}
                  data-testid="button-delete-of-task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
