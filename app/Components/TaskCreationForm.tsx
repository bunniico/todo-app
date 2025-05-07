import React, { useState } from "react";
import {
  Typography,
  TextField,
  Slider,
  Button,
  Input
} from "@mui/material";
import { Task } from "../Objects/Task";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, onSave }) => {
  const [taskInput, setTaskInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [importance, setImportance] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [timeEstimate, setTimeEstimate] = useState(0.5); // New state for time estimate
  const [error, setError] = useState(false);

  const handleSave = () => {
    // Text field must not be empty
    if (taskInput.trim() === "") {
        console.log("Task name is required.");
        setError(true);
        return;
    }

    // Date field must be in the future or empty
    const currentDate = new Date();
    const selectedDate = new Date(deadline);
    if (deadline && selectedDate <= currentDate) {
        setError(true);
        return;
    }

    const newTask: Task = {
        id: Date.now().toString(),
        name: taskInput,
        completed: false,
        dueDate: deadline ? new Date(deadline) : undefined,
        listId: undefined,
        parent: undefined,
        subtasks: [],
        importance,
        difficulty,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    onSave(newTask);
    setTaskInput("");
    setDeadline("");
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
        if (e.target.value.trim() !== "") {
        setError(false); // Clear error when input is valid
        }
    }}
    fullWidth
    style={{ marginBottom: 20 }}
    error={error} // Highlight the field in red if there's an error
    helperText={error ? "Task name is required" : ""} // Show error message
    />

    { /* Task Name */ }
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
        setTimeEstimate(0.0); // Reset to 0 if invalid input
        }
    }}
    fullWidth
    
    style={{ marginBottom: 20 }}
    />

    { /* Deadline */ }
    <TextField
    label="Deadline"
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    fullWidth
    style={{ marginBottom: 20 }}
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
        <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
            Save
        </Button>
      </div>
    </div>
  );
};

export default AddTaskModal;