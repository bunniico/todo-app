import React, { useState } from "react";
import {
  Typography,
  TextField,
  Slider,
  Button,
} from "@mui/material";
import { Zoom } from "@mui/material";
import { Task } from "../Objects/Task";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

/**
 * AddTaskModal is a React component for creating a new task.
 * 
 * @param {boolean} open - Determines if the modal is open.
 * @param {() => void} onClose - Callback function to close the modal.
 * @param {(task: Task) => void} onSave - Callback function to save the created task.
 */
const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, onSave }) => {
  const [taskInput, setTaskInput] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [importance, setImportance] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [timeEstimate, setTimeEstimate] = useState(0.5);
  const [nameValid, setNameValid] = useState(true);
  const [deadlineValid, setDeadlineValid] = useState(true);

  const validate = () => {
    let isValid = true;
    // Text field must not be empty
    if (taskInput.trim() === "") {
      alert("Task name is required.");
      setNameValid(false);
      isValid = false;
    }
    else {
      setNameValid(true);
    }

    // Date field must be in the future or empty
    const currentDate = new Date();
    const selectedDate = new Date(taskDueDate);
    if (taskDueDate && selectedDate <= currentDate) {
        setDeadlineValid(false);
        alert("Please select a future date for the deadline.");
        isValid = false;
    }
    else {
        setDeadlineValid(true);
    }

    return isValid;
  }

  const handleSave = () => {
    if (!validate()){
      alert("Please fix the errors before saving.");
      return;
    }

    const newTask: Task = {
        id: Date.now().toString(),
        name: taskInput,
        completed: false,
        dueDate: taskDueDate ? new Date(taskDueDate) : new Date(),
        listId: undefined,
        parent: undefined,
        subtasks: [],
        importance: importance,
        difficulty: difficulty,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    onSave(newTask);
    setTaskInput("");
    setTaskDueDate("");
    setImportance(3);
    setDifficulty(3);
    onClose();
  };

  if (!open) return null;

  return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "90%",
          maxWidth: 400,
        }}
      >

      <Typography variant="h6" style={{ marginBottom: 20 }}>
      Create a new task
      </Typography>

      { /* Task Name */ }
      <TextField
      label="Task Name"
      value={taskInput}
      onChange={(e) => {
          setTaskInput(e.target.value);
      }}
      fullWidth
      style={{ marginBottom: 20 }}
      error={!nameValid}
      helperText={!nameValid ? "Task name is required" : ""}
      />

      { /* Estimated Time */ }
      <TextField
      type="number"
      label="Estimated Time (hours)"
      defaultValue="0.5"
      value={timeEstimate}
      onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (!isNaN(value) && value >= 0) {
          setTimeEstimate(value);
          } else {
          setTimeEstimate(0.0);
          }
      }}
      fullWidth
      
      style={{ marginBottom: 20 }}
      />

      { /* Deadline */ }
      <TextField
      label="Deadline"
      type="date"
      value={taskDueDate ?? "2025-01-01"}
      onChange={(e) => setTaskDueDate(e.target.value)}
      fullWidth
      style={{ marginBottom: 20 }}
      error={!deadlineValid}
      helperText={!deadlineValid ? "Date must be in future" : ""}
      slotProps={{
          inputLabel:
              { shrink: true }, // Fixes label overlap issue
      }}
      />

      { /* Importance slider */ }
      <Typography gutterBottom>Importance</Typography>
      <Slider
      value={importance}
      onChange={(e, newValue) => setImportance(newValue as number)}
      step={1}
      marks
      min={1}
      max={5}
      valueLabelDisplay="auto"
      style={{ marginBottom: 20 }}
      />

      { /* Difficulty slider */ }
      <Typography gutterBottom>Difficulty</Typography>
      <Slider
          value={difficulty}
          onChange={(e, newValue) => setDifficulty(newValue as number)}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
          style={{ marginBottom: 20 }}
      />

      { /* Save or cancel */ }
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Zoom in={true} style={{ transitionDelay: "50ms", transitionBehavior: "ease-in-out" }}>
          <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
          </Button>
        </Zoom>
        <Zoom in={true} style={{ transitionDelay: "100ms", transitionBehavior: "ease-in-out"}}>
          <Button variant="contained" color="primary" onClick={handleSave}>
              Save
          </Button>
        </Zoom>
        </div>
      </div>
  );
};

export default AddTaskModal;