import { nanoid } from "nanoid";
import { useState } from "react";
export interface Task {
  id: string;
  title: string;
}
export interface TaskManagerState {
  title: string;
  tasks: Task[];
  searchKeyword: string;
}

export const initialState: TaskManagerState = {
  title: "",
  tasks: [],
  searchKeyword: "",
};
export const useTaskManager = () => {
  const [state, setState] = useState<TaskManagerState>(initialState);
  const { title, tasks, searchKeyword } = state;
  const setTitle =(newTitle: string) =>{
    setState({ ...state , title: newTitle})
  }
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
  return { title,setTitle, handleSearch, addTask, updateTask, completeTask, filteredTasks};
};
