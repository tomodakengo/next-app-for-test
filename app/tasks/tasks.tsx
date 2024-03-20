import React, { useState, useEffect } from "react";

interface Task {
  text: string;
  done: boolean;
}

function useTasks(initialTasks: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index: number, updatedTask: Task) => {
    setTasks(tasks.map((task, i) => (i === index ? updatedTask : task)));
  };

  const markDone = (index: number) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, done: true } : task)),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  return {
    tasks,
    addTask,
    removeTask,
    editTask,
    markDone,
    newTask,
    handleInputChange,
  };
}

export default function Tasks() {
  const initialTasks: Task[] = [
    { text: "Run the tests", done: true },
    { text: "Deploy the app", done: false },
  ];

  const {
    tasks,
    addTask,
    removeTask,
    editTask,
    markDone,
    newTask,
    handleInputChange,
  } = useTasks(initialTasks);

  const percentageOfDone = tasks.length
    ? ((tasks.filter((task) => task.done).length / tasks.length) * 100).toFixed(
        0,
      )
    : "0";

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/4">
        <div>
          <div className="stat">
            <div className="stat-value" data-testid="label-percentage-of-done">
              {isNaN(parseFloat(percentageOfDone)) ? "0" : percentageOfDone}%
            </div>
            <div className="stat-title">Tasks done</div>
            <div
              className="stat-desc text-secondary"
              data-testid="label-tasks-remaining"
            >
              {tasks.filter((task) => !task.done).length} tasks remaining
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
              onClick={() => addTask({ text: newTask, done: false })}
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
                  onClick={() =>
                    editTask(index, {
                      ...task,
                      text: prompt("Edit task", task.text) || task.text,
                      done: false,
                    })
                  }
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
