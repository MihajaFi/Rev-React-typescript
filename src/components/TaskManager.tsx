import { nanoid } from "nanoid";
import React, { useState } from "react";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerState {
  title: string;
  tasks: Task[];
  searchKeyword: string;
}

const initialState: TaskManagerState = {
  title: "",
  tasks: [],
  searchKeyword: "",
};
const useTaskManager = () => {
  const [state, setState] = useState(initialState);
  const { title, tasks, searchKeyword } = state;

  const completeTask = (id: string) => {
    setState({ ...state, tasks: tasks.filter((tasks) => tasks.id !== id) });
  };
  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const updateTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setState({ ...state, tasks: updateTasks });
  };
  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask = {
      id: nanoid(),
      title,
    };
    setState({ ...state, tasks: [...tasks, newTask], title: "" });
  };
  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKeyword: ev.target.value });
  };
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
};
// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // remove task from list
  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const updateTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setTasks(updateTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
