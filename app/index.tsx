import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from '@mui/material';
import React, { useState } from "react";
import { Box } from "@mui/material";
import AddTaskButton from "./Components/AddTaskButton"; 
import Header from "./Components/Header";
import { Task } from "./Objects/Task";
import TaskList from "./Components/TaskList";
import AddTaskModal from "./Components/TaskCreationForm";

/**
 * The `Index` component serves as the main entry point for the application.
 * It provides a task management interface where users can view, add, and toggle
 * the completion status of tasks. The component utilizes Material-UI for styling
 * and theming, and it includes a header, task list, and modal for task creation.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered `Index` component.
 *
 * @remarks
 * - The component uses React's `useState` hook to manage the visibility of the task
 *   creation form and the list of tasks.
 * - The `addTask` function is responsible for adding a new task to the list and
 *   hiding the modal.
 * - The `toggleTaskCompletion` function toggles the completion status of a task
 *   based on its unique identifier.
 *
 * @example
 * ```tsx
 * import Index from './index';
 *
 * function App() {
 *   return <Index />;
 * }
 * ```
 */
export default function Index(): React.ReactElement {

  const [showForm, setShowForm] = useState(false); // Controls the visibility of the form modal
  const [tasks, setTasks] = useState<Task[]>([]); // Stores the list of tasks

  /**
   * Adds a new task to the task list and hides the task creation form.
   *
   * @param task - The task object to be added, containing a unique `id` and a `name`.
   * 
   * Logs the task details to the console and updates the state with the new task.
   */
  const addTask = (task: Task) => {
    console.log("Task added:" + task.name + " (" + task.id + ")");
    setTasks((prevTasks) => [...prevTasks, task]);
    setShowForm(false);
  };

  /**
   * Toggles the completion status of a task by its ID.
   *
   * @param id - The unique identifier of the task to toggle.
   * @returns void
   *
   * This function updates the state of tasks by mapping through the current list
   * of tasks and flipping the `completed` property of the task that matches the
   * provided ID. All other tasks remain unchanged.
   */
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
    <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" />
        <CssBaseline />
        <Header title="Welcome Back, Ellie. ☀️" subtitle="Let's get started with your tasks." />
        <Box sx={{ flex: 1 }}>
          <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />
          <AddTaskButton onClick={() => setShowForm(true)} />
          <AddTaskModal
            open={showForm}
            onClose={() => setShowForm(false)}
            onSave={addTask}
          />
        </Box>
    </div>
  </ThemeProvider>
  );
}